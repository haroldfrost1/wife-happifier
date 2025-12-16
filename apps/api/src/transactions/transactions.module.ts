import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { FilterRule } from './filter-rule.entity';
import { TransactionsController } from './transactions.controller';
import { FilterRulesController } from './filter-rules.controller';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, FilterRule])],
  controllers: [TransactionsController, FilterRulesController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
