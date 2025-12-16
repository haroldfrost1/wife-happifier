import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFilterRules1765853512517 implements MigrationInterface {
  name = 'CreateFilterRules1765853512517';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "filter_rule" (
        "id" SERIAL NOT NULL,
        "field" character varying NOT NULL,
        "operator" character varying NOT NULL,
        "value" character varying NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_f03560a344df4359aa1afbe0461" PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "filter_rule"`);
  }
}
