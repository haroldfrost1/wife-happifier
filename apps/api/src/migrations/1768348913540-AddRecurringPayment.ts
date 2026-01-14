import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRecurringPayment1768348913540 implements MigrationInterface {
  name = 'AddRecurringPayment1768348913540';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "recurring_payment" ("id" SERIAL NOT NULL, "name" text NOT NULL, "amount" numeric(12,2) NOT NULL, "frequency" text NOT NULL DEFAULT 'MONTHLY', "category" text, "startDate" date NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fe8b458aea13cded08d007c8e9c" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "recurring_payment"`);
  }
}
