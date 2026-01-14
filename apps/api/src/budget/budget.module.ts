import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';
import { RecurringPayment } from './recurring-payment.entity';
import { SpendingsModule } from '../spendings/spendings.module';

@Module({
    imports: [TypeOrmModule.forFeature([RecurringPayment]), SpendingsModule],
    controllers: [BudgetController],
    providers: [BudgetService],
    exports: [BudgetService],
})
export class BudgetModule { }
