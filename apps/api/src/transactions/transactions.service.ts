import { Injectable } from '@nestjs/common';
import { PaginatedResult } from '@wife-happifier/shared';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { ParserFactory } from './parsers';

export interface MonthlyReportItem {
  month: string;
  income: number;
  expense: number;
  netSavings: number;
}

interface MonthlyReportRaw {
  month: string;
  income: string;
  expense: string;
}

export interface CategoryBreakdownItem {
  category: string;
  amount: number;
}

interface CategoryBreakdownRaw {
  category: string;
  amount: string;
}

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedResult<Transaction>> {
    const [data, total] = await this.transactionsRepository.findAndCount({
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

  async create(transaction: Partial<Transaction>): Promise<Transaction> {
    const newTransaction = this.transactionsRepository.create(transaction);
    return this.transactionsRepository.save(newTransaction);
  }

  async import(fileBuffer: Buffer, bankId: string): Promise<Transaction[]> {
    const parser = ParserFactory.getParser(bankId);
    const partialTransactions = await parser.parse(fileBuffer);

    const transactions = partialTransactions.map((pt) =>
      this.transactionsRepository.create(pt),
    );

    return this.transactionsRepository.save(transactions);
  }

  async getMonthlyReport(): Promise<MonthlyReportItem[]> {
    const rawData = (await this.transactionsRepository.query(`
      SELECT
        TO_CHAR("date", 'YYYY-MM') as month,
        SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END) as income,
        SUM(CASE WHEN amount < 0 THEN amount ELSE 0 END) as expense
      FROM transaction
      GROUP BY 1
      ORDER BY 1 DESC
    `)) as MonthlyReportRaw[];

    return rawData.map((row) => ({
      month: row.month,
      income: Number(row.income),
      expense: Math.abs(Number(row.expense)),
      netSavings: Number(row.income) + Number(row.expense),
    }));
  }

  async getCategoryBreakdown(month: string): Promise<CategoryBreakdownItem[]> {
    const rawData = (await this.transactionsRepository.query(
      `
      SELECT
        category,
        SUM(amount) as amount
      FROM transaction
      WHERE TO_CHAR("date", 'YYYY-MM') = $1
      AND amount < 0
      GROUP BY 1
      ORDER BY 2 ASC
    `,
      [month],
    )) as CategoryBreakdownRaw[];

    return rawData.map((row) => ({
      category: row.category || 'Uncategorized',
      amount: Math.abs(Number(row.amount)),
    }));
  }
}
