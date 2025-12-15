import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity()
@Index('IDX_TRANSACTION_DATE', ['date']) // Query optimization: we often sort/filter by date
export class Transaction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'date' })
  date!: string;

  @Column({ type: 'text' }) // More flexible than default varchar(255) if descriptions get long
  description!: string;

  // Precision 12, Scale 2 allows up to 9,999,999,999.99 (enough for personal finance!)
  // Using 'decimal' is correct for money to avoid floating point errors.
  @Column('decimal', { precision: 12, scale: 2 })
  amount!: number;

  @Column('decimal', { precision: 12, scale: 2 })
  balance!: number;

  @Column({ type: 'text', nullable: true })
  category!: string | null;

  @CreateDateColumn() // Audit: when was this record inserted?
  createdAt!: Date;
}
