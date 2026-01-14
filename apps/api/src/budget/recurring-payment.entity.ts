import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { PaymentFrequency, PaymentType } from '@wife-happifier/shared';

@Entity()
export class RecurringPayment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'text' })
    name!: string;

    @Column('decimal', { precision: 12, scale: 2 })
    amount!: number;

    @Column({
        type: 'text',
        enum: PaymentFrequency,
        default: PaymentFrequency.MONTHLY,
    })
    frequency!: PaymentFrequency;

    @Column({
        type: 'text',
        enum: PaymentType,
        default: PaymentType.EXPENSE,
    })
    type!: PaymentType;

    @Column({ type: 'text', nullable: true })
    category!: string | null;

    @Column({ type: 'date' })
    startDate!: string;

    @CreateDateColumn()
    createdAt!: Date;
}
