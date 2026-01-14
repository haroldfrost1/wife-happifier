import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Spending } from './spending.entity';
import { PaginatedResult } from '@wife-happifier/shared';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { NotionService } from '../notion/notion.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SpendingsService {
    constructor(
        @InjectRepository(Spending)
        private spendingsRepository: Repository<Spending>,
        private httpService: HttpService,
        private readonly notionService: NotionService,
        private readonly configService: ConfigService,
    ) { }

    async findAll(
        page: number = 1,
        limit: number = 10,
    ): Promise<PaginatedResult<Spending>> {
        const [data, total] = await this.spendingsRepository.findAndCount({
            order: { date: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        });

        return {
            data,
            meta: {
                total,
                page,
                lastPage: Math.ceil(total / limit),
            },
        };
    }

    async create(spending: Partial<Spending>): Promise<Spending> {
        const newSpending = this.spendingsRepository.create(spending);
        return this.spendingsRepository.save(newSpending);
    }
    async findLatestTransactionDate(): Promise<Date | null> {
        const result = await this.spendingsRepository
            .createQueryBuilder('spending')
            .orderBy('spending.date', 'DESC')
            .getOne();
        return result ? new Date(result.date) : null;
    }

    @Cron('0 0 * * *')
    async syncUpBankTransactions() {
        console.log('Starting Up Bank transaction sync...');
        try {
            const latestDate = await this.findLatestTransactionDate();
            // If no latest date, default to a sensible past, e.g., 2024-01-01 or just don't pass filter[since] if API supports full history pagination (Up API does).
            // But prompt says "use the very beginning of time".
            // Let's use a very old date or just null if "beginning of time" means everything.
            // Up API docs say filter[since] is optional. If missing, it returns all?
            // "To narrow the results to a specific date range pass one or both of filter[since] and filter[until]"
            // So omit it for first call.

            // However, prompting specifically asked: 
            // - for the first call use the very beginning of time
            // - for the subsequent calls use the transaction date of the latest settled transaction fetched from the endpoint

            // Wait, "use the transaction date of the latest settled transaction fetched from the endpoint"
            // So I should pass `filter[since]` with that date.

            let url = 'https://api.up.com.au/api/v1/transactions';
            const params: any = {
                'filter[status]': 'SETTLED',
                'page[size]': 100
            };

            if (latestDate) {
                params['filter[since]'] = latestDate.toISOString();
            }

            // Iterate pages
            while (url) {
                console.log(`Fetching transactions from ${url} with params`, params);
                // Note: when following 'next' link, params are usually part of the link, so we shouldn't pass them again if we are using the full URL from 'next'.
                // But for the FIRST call we pass params.

                const response = await firstValueFrom(
                    this.httpService.get(url, {
                        headers: { Authorization: `Bearer ${process.env.UP_BANK_TOKEN}` },
                        params: url.includes('page[after]') ? {} : params // Only pass params if not a pagination link
                    })
                );

                const { data, links } = response.data;
                const transactions = data;

                if (transactions.length > 0) {
                    await this.persistTransactions(transactions);
                }

                url = links.next;
                // If url is next, we reset params because they are encoded in the next link
                if (url) {
                    for (const key in params) delete params[key];
                }
            }
            console.log('Up Bank transaction sync completed.');

        } catch (error) {
            console.error('Error syncing Up Bank transactions:', error);
        }
    }

    private async persistTransactions(transactions: any[]) {
        for (const t of transactions) {
            const externalId = t.id;
            // Deduplication check
            const exists = await this.spendingsRepository.findOne({ where: { externalId } });
            if (exists) {
                continue;
            }

            const amountVal = parseFloat(t.attributes.amount.value);
            // Up Bank: positive is credit, negative is debit.
            // Spending entity: typically positive for spending? 
            // "Spending" implies expenses.
            // But transaction entity had `amount` where income > 0 and expense < 0.
            // Let's keep the raw value.

            const categoryId = t.relationships.category?.data?.id || null;

            // Spending entity needs: date, description, amount, category, externalId
            const newSpending = this.spendingsRepository.create({
                date: t.attributes.createdAt, // or settledAt if available/preferred. Prompt said "transaction date". created_at is standard.
                description: t.attributes.description, // or rawText?
                amount: amountVal,
                category: categoryId,
                externalId: externalId
            });
            await this.spendingsRepository.save(newSpending);

            await this.syncTransactionToNotion(t, amountVal);
        }
    }

    public async syncTransactionToNotion(t: any, amountVal: number) {
        try {
            const databaseId = this.configService.get<string>('NOTION_DATABASE_ID');
            if (databaseId) {
                await this.notionService.client.pages.create({
                    parent: {
                        database_id: databaseId,
                    },
                    properties: {
                        "Description": {
                            title: [
                                {
                                    text: {
                                        content: t.attributes.description || "No Description",
                                    },
                                },
                            ],
                        },
                        "Amount": {
                            number: amountVal,
                        },
                        "Transaction Date": {
                            date: {
                                start: t.attributes.createdAt, // Using createdAt as transaction date
                            },
                        },
                        "Category": {
                            rich_text: [
                                {
                                    text: {
                                        content: await this.getCategoryName(t.relationships.category?.data?.id),
                                    },
                                },
                            ],
                        },
                    },
                });
            }
        } catch (error) {
            console.error(`Failed to sync transaction ${t.id} to Notion:`, error);
        }
    }

    private async getCategoryName(categoryId: string | null): Promise<string> {
        // Ideally we would fetch the category name from Up API or a local map.
        // For now, let's return the ID or "Uncategorized".
        // If the prompt implied "Test" as a placeholder, I'll use the ID for better data or "Uncategorized".
        return categoryId || 'Uncategorized';
    }
    async getMTDSpending(): Promise<number> {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const { sum } = await this.spendingsRepository
            .createQueryBuilder('spending')
            .select('SUM(spending.amount)', 'sum')
            .where('spending.date >= :startOfMonth', { startOfMonth })
            // We usually care about "spending", if amount is negative for expenses, we might need ABS or just sum.
            // But looking at persistTransactions: "const amountVal = parseFloat(t.attributes.amount.value)"
            // Up Bank API: negative for debits (expenses), positive for credits (income).
            // Usually "Spending" MTD means "How much did I spend". So we sum negative values and negate them? 
            // Or just return the net flow?
            // "track the current spending" usually means Expenses.
            // Let's filter for amount < 0 (expenses) and sum them (absolute value).
            .andWhere('spending.amount < 0')
            .getRawOne();

        return Math.abs(parseFloat(sum || '0'));
    }

    async getYTDSpending(): Promise<number> {
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const { sum } = await this.spendingsRepository
            .createQueryBuilder('spending')
            .select('SUM(spending.amount)', 'sum')
            .where('spending.date >= :startOfYear', { startOfYear })
            .andWhere('spending.amount < 0')
            .getRawOne();

        return Math.abs(parseFloat(sum || '0'));
    }
}
