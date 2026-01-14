export enum PaymentFrequency {
    DAILY = 'DAILY',
    WEEKLY = 'WEEKLY',
    MONTHLY = 'MONTHLY',
    QUARTERLY = 'QUARTERLY',
    YEARLY = 'YEARLY',
    ONCE_OFF = 'ONCE_OFF',
}

export enum PaymentType {
    INCOME = 'INCOME',
    EXPENSE = 'EXPENSE',
}

export interface RecurringPayment {
    id: number;
    name: string;
    amount: string;
    frequency: PaymentFrequency;
    type: PaymentType;
    category: string | null;
    startDate: string;
    createdAt?: Date; // Optional as it might not always be needed in frontend forms
}
