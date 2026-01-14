import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPaymentType1768351558763 implements MigrationInterface {
  name = 'AddPaymentType1768351558763';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "recurring_payment" ADD "type" text NOT NULL DEFAULT 'EXPENSE'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "recurring_payment" DROP COLUMN "type"`,
    );
  }
}
