import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { parse } from 'csv-parse/sync';
import { Transaction } from './transaction.entity';

interface CsvRecord {
  Date: string;
  Description: string;
  Debit: string;
  Credit: string;
  Balance: string;
  Category: string;
}

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}

  findAll(): Promise<Transaction[]> {
    return this.transactionsRepository.find({
      order: { date: 'DESC' },
    });
  }

  async create(transaction: Partial<Transaction>): Promise<Transaction> {
    const newTransaction = this.transactionsRepository.create(transaction);
    return this.transactionsRepository.save(newTransaction);
  }

  async import(fileBuffer: Buffer): Promise<Transaction[]> {
    const records: CsvRecord[] = parse(fileBuffer, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    const transactions: Transaction[] = [];

    for (const record of records) {
      const transaction = new Transaction();

      // Parse Date: YYYYMMDD -> YYYY-MM-DD
      const rawDate = record['Date'];
      if (rawDate && typeof rawDate === 'string' && rawDate.length === 8) {
        transaction.date = `${rawDate.substring(0, 4)}-${rawDate.substring(4, 6)}-${rawDate.substring(6, 8)}`;
      }

      transaction.description = record['Description'] || '';

      // Handle Debit/Credit
      const debit = record['Debit'] ? parseFloat(record['Debit']) : 0;
      const credit = record['Credit'] ? parseFloat(record['Credit']) : 0;
      transaction.amount = credit - debit; // Credit is positive, Debit is negative

      transaction.balance = record['Balance']
        ? parseFloat(record['Balance'])
        : 0;
      transaction.category = record['Category'] || null;

      transactions.push(transaction);
    }

    return this.transactionsRepository.save(transactions);
  }
}
