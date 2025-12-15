import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { ParserFactory } from './parsers';

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

  async import(fileBuffer: Buffer, bankId: string): Promise<Transaction[]> {
    const parser = ParserFactory.getParser(bankId);
    const partialTransactions = await parser.parse(fileBuffer);

    const transactions = partialTransactions.map((pt) =>
      this.transactionsRepository.create(pt),
    );

    return this.transactionsRepository.save(transactions);
  }
}
