import { Transaction } from '../transaction.entity';

export interface TransactionParser {
  parse(fileBuffer: Buffer): Promise<Partial<Transaction>[]>;
}
