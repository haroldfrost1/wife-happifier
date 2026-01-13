import { MigrationInterface, QueryRunner } from "typeorm";

export class AddExternalIdToSpending1768347063842 implements MigrationInterface {
    name = 'AddExternalIdToSpending1768347063842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "spending" ("id" SERIAL NOT NULL, "externalId" text, "date" date NOT NULL, "description" text NOT NULL, "amount" numeric(12,2) NOT NULL, "category" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_c708c9d9fd309bf028e320b542a" UNIQUE ("externalId"), CONSTRAINT "PK_497d7e3196b0f03cdf19f420d69" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_SPENDING_DATE" ON "spending" ("date") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_SPENDING_DATE"`);
        await queryRunner.query(`DROP TABLE "spending"`);
    }

}
