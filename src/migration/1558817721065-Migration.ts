import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1558817721065 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "app_public"."asset" ("id" SERIAL NOT NULL, "state" character varying NOT NULL, "data" jsonb NOT NULL, "createdBy" character varying, "updatedBy" character varying, "createdAt" TIMESTAMP, "updatedAt" TIMESTAMP, "siteId" integer NOT NULL, CONSTRAINT "PK_94af4e5e193c19a6b58afc93187" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e4d91ee1aa4271b3aca6484f93" ON "app_public"."asset" ("siteId") `);
        await queryRunner.query(`CREATE TABLE "app_public"."post_assets_asset" ("postId" integer NOT NULL, "assetId" integer NOT NULL, CONSTRAINT "PK_6a3c0346add90a4cd91e39e6bab" PRIMARY KEY ("postId", "assetId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_726a1fbf3d1ea67fc50ec80a48" ON "app_public"."post_assets_asset" ("postId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0ed3210c973a7fc9e2052efa80" ON "app_public"."post_assets_asset" ("assetId") `);
        await queryRunner.query(`ALTER TABLE "app_public"."asset" ADD CONSTRAINT "FK_e4d91ee1aa4271b3aca6484f93d" FOREIGN KEY ("siteId") REFERENCES "app_public"."site"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app_public"."post_assets_asset" ADD CONSTRAINT "FK_726a1fbf3d1ea67fc50ec80a48e" FOREIGN KEY ("postId") REFERENCES "app_public"."post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app_public"."post_assets_asset" ADD CONSTRAINT "FK_0ed3210c973a7fc9e2052efa802" FOREIGN KEY ("assetId") REFERENCES "app_public"."asset"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "app_public"."post_assets_asset" DROP CONSTRAINT "FK_0ed3210c973a7fc9e2052efa802"`);
        await queryRunner.query(`ALTER TABLE "app_public"."post_assets_asset" DROP CONSTRAINT "FK_726a1fbf3d1ea67fc50ec80a48e"`);
        await queryRunner.query(`ALTER TABLE "app_public"."asset" DROP CONSTRAINT "FK_e4d91ee1aa4271b3aca6484f93d"`);
        await queryRunner.query(`DROP INDEX "app_public"."IDX_0ed3210c973a7fc9e2052efa80"`);
        await queryRunner.query(`DROP INDEX "app_public"."IDX_726a1fbf3d1ea67fc50ec80a48"`);
        await queryRunner.query(`DROP TABLE "app_public"."post_assets_asset"`);
        await queryRunner.query(`DROP INDEX "app_public"."IDX_e4d91ee1aa4271b3aca6484f93"`);
        await queryRunner.query(`DROP TABLE "app_public"."asset"`);
    }

}
