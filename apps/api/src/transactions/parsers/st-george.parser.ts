import { parse } from 'csv-parse/sync';
import { TransactionParser } from './types';
import { Transaction } from '../transaction.entity';

interface StGeorgeCsvRecord {
  Date: string;
  Description: string;
  Debit: string;
  Credit: string;
  Balance: string;
  Category: string;
  Ignored?: string;
}

export class StGeorgeParser implements TransactionParser {
  parse(fileBuffer: Buffer): Promise<Partial<Transaction>[]> {
    const records: StGeorgeCsvRecord[] = parse(fileBuffer, {
      columns: [
        'Date',
        'Description',
        'Debit',
        'Credit',
        'Balance',
        'Category',
        'Ignored',
      ], // Explicitly define columns for St. George
      from_line: 2, // Skip the original header which has only 6 columns
      relax_column_count: true,
      trim: true,
      skip_empty_lines: true,
    });

    const transactions: Partial<Transaction>[] = [];

    for (const record of records) {
      const transaction: Partial<Transaction> = {};

      // Parse Date
      const rawDate = record['Date'];
      if (!rawDate) continue;

      // St. George: YYYYMMDD -> YYYY-MM-DD
      if (typeof rawDate === 'string' && rawDate.length === 8) {
        transaction.date = `${rawDate.substring(0, 4)}-${rawDate.substring(4, 6)}-${rawDate.substring(6, 8)}`;
      }

      transaction.description = record['Description'] || '';

      // Handle Debit/Credit
      const debitStr = record['Debit'] ? record['Debit'].toString() : '0';
      const creditStr = record['Credit'] ? record['Credit'].toString() : '0';

      const debit = parseFloat(debitStr.replace(',', ''));
      const credit = parseFloat(creditStr.replace(',', ''));

      transaction.amount = credit - debit;

      const balanceStr = record['Balance'] ? record['Balance'].toString() : '0';
      transaction.balance = parseFloat(balanceStr.replace(',', ''));

      transaction.category = record['Category'] || null;

      transactions.push(transaction);
    }

    return Promise.resolve(transactions);
  }
}
