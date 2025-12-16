import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class FilterRule {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  field!: string; // 'date', 'description', 'amount'

  @Column()
  operator!: string; // 'contains', 'equals', 'lt', 'gt'

  @Column()
  value!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
