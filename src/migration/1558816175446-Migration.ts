import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1558816175446 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "app_public"."post" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "password" character varying, "type" character varying, "date" TIMESTAMP, "data" jsonb NOT NULL, "createdBy" character varying, "updatedBy" character varying, "createdAt" TIMESTAMP, "updatedAt" TIMESTAMP, "siteId" integer NOT NULL, CONSTRAINT "UQ_a1975fafe53b9a8676b13855792" UNIQUE ("siteId", "name"), CONSTRAINT "PK_782b4cb2a415dfeae27c75cc549" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b0f39d1a4cdf8b4c17aa8cc1b8" ON "app_public"."post" ("siteId") `);
        await queryRunner.query(`CREATE INDEX "IDX_588584f36c78adb4f00c08ed1d" ON "app_public"."post" ("type") `);
        await queryRunner.query(`CREATE INDEX "IDX_e324585eaf8fc571622134e90d" ON "app_public"."post" ("date") `);
        await queryRunner.query(`CREATE INDEX "IDX_869fe94b85a2d7c44278c0abe5" ON "app_public"."post" ("id", "siteId") `);
        await queryRunner.query(`ALTER TABLE "app_private"."session" DROP CONSTRAINT "FK_9844c9da57879f119027c87e5e0"`);
        await queryRunner.query(`ALTER TABLE "app_private"."session" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_private"."session" DROP CONSTRAINT "REL_9844c9da57879f119027c87e5e"`);
        await queryRunner.query(`CREATE INDEX "IDX_9844c9da57879f119027c87e5e" ON "app_private"."session" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0c0b9abdc5fccbaa8be75603ca" ON "app_private"."session" ("invalidAfter") `);
        await queryRunner.query(`ALTER TABLE "app_public"."post" ADD CONSTRAINT "FK_b0f39d1a4cdf8b4c17aa8cc1b8a" FOREIGN KEY ("siteId") REFERENCES "app_public"."site"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app_private"."session" ADD CONSTRAINT "FK_9844c9da57879f119027c87e5e0" FOREIGN KEY ("userId") REFERENCES "app_public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "app_private"."session" DROP CONSTRAINT "FK_9844c9da57879f119027c87e5e0"`);
        await queryRunner.query(`ALTER TABLE "app_public"."post" DROP CONSTRAINT "FK_b0f39d1a4cdf8b4c17aa8cc1b8a"`);
        await queryRunner.query(`DROP INDEX "app_private"."IDX_0c0b9abdc5fccbaa8be75603ca"`);
        await queryRunner.query(`DROP INDEX "app_private"."IDX_9844c9da57879f119027c87e5e"`);
        await queryRunner.query(`ALTER TABLE "app_private"."session" ADD CONSTRAINT "REL_9844c9da57879f119027c87e5e" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "app_private"."session" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_private"."session" ADD CONSTRAINT "FK_9844c9da57879f119027c87e5e0" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP INDEX "app_public"."IDX_869fe94b85a2d7c44278c0abe5"`);
        await queryRunner.query(`DROP INDEX "app_public"."IDX_e324585eaf8fc571622134e90d"`);
        await queryRunner.query(`DROP INDEX "app_public"."IDX_588584f36c78adb4f00c08ed1d"`);
        await queryRunner.query(`DROP INDEX "app_public"."IDX_b0f39d1a4cdf8b4c17aa8cc1b8"`);
        await queryRunner.query(`DROP TABLE "app_public"."post"`);
    }

}
