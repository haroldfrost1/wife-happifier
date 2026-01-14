import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecurringPayment } from './recurring-payment.entity';
import { SpendingsService } from '../spendings/spendings.service';

@Injectable()
export class BudgetService {
    constructor(
        @InjectRepository(RecurringPayment)
        private recurringPaymentRepository: Repository<RecurringPayment>,
        private spendingsService: SpendingsService,
    ) { }

    findAll(): Promise<RecurringPayment[]> {
        return this.recurringPaymentRepository.find({
            order: {
                amount: 'DESC',
            },
        });
    }

    create(data: Partial<RecurringPayment>): Promise<RecurringPayment> {
        const payment = this.recurringPaymentRepository.create(data);
        return this.recurringPaymentRepository.save(payment);
    }

    delete(id: number): Promise<void> {
        return this.recurringPaymentRepository.delete(id).then(() => undefined);
    }

    async getSummary() {
        // Calculate recurring total monthly (approximate)
        // This logic is duplicated from frontend, ideal to have it centralized but for now we just return actuals.
        // Frontend already calculates the budget total.
        // We just need actuals here.
        const mtd = await this.spendingsService.getMTDSpending();
        const ytd = await this.spendingsService.getYTDSpending();

        return {
            mtdSpending: mtd,
            ytdSpending: ytd,
        };
    }
}
