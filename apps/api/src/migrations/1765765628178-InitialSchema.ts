import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1765765628178 implements MigrationInterface {
    name = 'InitialSchema1765765628178'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "date" date NOT NULL, "description" text NOT NULL, "amount" numeric(12,2) NOT NULL, "balance" numeric(12,2) NOT NULL, "category" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_TRANSACTION_DATE" ON "transaction" ("date") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_TRANSACTION_DATE"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
    }

}
