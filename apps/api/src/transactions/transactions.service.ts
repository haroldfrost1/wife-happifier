import { Injectable } from '@nestjs/common';
import { PaginatedResult } from '@wife-happifier/shared';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { FilterRule } from './filter-rule.entity';
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
    @InjectRepository(FilterRule)
    private filterRulesRepository: Repository<FilterRule>,
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

  private async getFilterCondition(): Promise<string> {
    const rules = await this.filterRulesRepository.find();
    if (rules.length === 0) {
      return '1=1'; // No filters
    }

    // "Exclusion" logic: exclude if match ANY rule.
    // So valid if it does NOT match rule 1 AND does NOT match rule 2 ...
    // WHERE (NOT (rule1) AND NOT (rule2) ...)

    const conditions = rules.map((rule) => {
      const field = `"${rule.field}"`; // quote field name for safety/reserved words
      const value = rule.value.replace(/'/g, "''"); // minimal SQL injection protection for raw query

      switch (rule.operator) {
        case 'contains':
          return `(${field} ILIKE '%${value}%')`;
        case 'equals':
          return `(${field} = '${value}')`;
        case 'lt':
          return `(${field} < '${value}')`;
        case 'gt':
          return `(${field} > '${value}')`;
        default:
          return 'false'; // Should not happen
      }
    });

    // We want to EXCLUDE if any of these are true.
    // So we include only if NONE of these are true.
    // Equivalent to: NOT (cond1 OR cond2 OR cond3)
    const combined = conditions.join(' OR ');
    return `NOT (${combined})`;
  }

  async getMonthlyReport(): Promise<MonthlyReportItem[]> {
    const filterCondition = await this.getFilterCondition();

    const rawData = (await this.transactionsRepository.query(`
      SELECT
        TO_CHAR("date", 'YYYY-MM') as month,
        SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END) as income,
        SUM(CASE WHEN amount < 0 THEN amount ELSE 0 END) as expense
      FROM transaction
      WHERE ${filterCondition}
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
    const filterCondition = await this.getFilterCondition();

    const rawData = (await this.transactionsRepository.query(
      `
      SELECT
        category,
        SUM(amount) as amount
      FROM transaction
      WHERE TO_CHAR("date", 'YYYY-MM') = $1
      AND amount < 0
      AND ${filterCondition}
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
