import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1558816665366 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "app_public"."IDX_869fe94b85a2d7c44278c0abe5"`);
        await queryRunner.query(`CREATE TABLE "app_public"."category" ("id" SERIAL NOT NULL, "data" jsonb NOT NULL, "name" character varying NOT NULL, "createdBy" character varying, "updatedBy" character varying, "createdAt" TIMESTAMP, "updatedAt" TIMESTAMP, "siteId" integer NOT NULL, CONSTRAINT "UQ_523e4647948d0eac6a9e345d440" UNIQUE ("siteId", "name"), CONSTRAINT "PK_f824a08e01115347a25a656a24f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c05b0dae914a1e064f440f7246" ON "app_public"."category" ("siteId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_523e4647948d0eac6a9e345d44" ON "app_public"."category" ("siteId", "name") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_a1975fafe53b9a8676b1385579" ON "app_public"."post" ("siteId", "name") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_869fe94b85a2d7c44278c0abe5" ON "app_public"."post" ("id", "siteId") `);
        await queryRunner.query(`ALTER TABLE "app_public"."category" ADD CONSTRAINT "FK_c05b0dae914a1e064f440f72461" FOREIGN KEY ("siteId") REFERENCES "app_public"."site"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "app_public"."category" DROP CONSTRAINT "FK_c05b0dae914a1e064f440f72461"`);
        await queryRunner.query(`DROP INDEX "app_public"."IDX_869fe94b85a2d7c44278c0abe5"`);
        await queryRunner.query(`DROP INDEX "app_public"."IDX_a1975fafe53b9a8676b1385579"`);
        await queryRunner.query(`DROP INDEX "app_public"."IDX_523e4647948d0eac6a9e345d44"`);
        await queryRunner.query(`DROP INDEX "app_public"."IDX_c05b0dae914a1e064f440f7246"`);
        await queryRunner.query(`DROP TABLE "app_public"."category"`);
        await queryRunner.query(`CREATE INDEX "IDX_869fe94b85a2d7c44278c0abe5" ON "app_public"."post" ("id", "siteId") `);
    }
}
