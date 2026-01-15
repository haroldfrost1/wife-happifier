import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsModule } from './transactions/transactions.module';
import { Transaction } from './transactions/transaction.entity';
import { FilterRule } from './transactions/filter-rule.entity';
import { SpendingsModule } from './spendings/spendings.module';
import { Spending } from './spendings/spending.entity';
import { BudgetModule } from './budget/budget.module';
import { RecurringPayment } from './budget/recurring-payment.entity';
import { UpBankWebhookModule } from './upbank-webhook/upbank-webhook.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available everywhere
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5532', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'wife-happifier',
      entities: [Transaction, FilterRule, Spending, RecurringPayment],
      synchronize: false, // Migrations are properly handled now
      migrationsRun: true,
      migrations: [join(__dirname, 'migrations/*.{ts,js}')],
    }),
    TransactionsModule,
    SpendingsModule,
    BudgetModule,
    UpBankWebhookModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
