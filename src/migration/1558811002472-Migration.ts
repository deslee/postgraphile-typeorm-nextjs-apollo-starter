import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1558811002472 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "app_public"."user" ALTER COLUMN "createdBy" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_public"."user" ALTER COLUMN "updatedBy" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_public"."user" ALTER COLUMN "createdAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_public"."user" ALTER COLUMN "updatedAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_private"."private_user" ALTER COLUMN "createdBy" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_private"."private_user" ALTER COLUMN "updatedBy" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_private"."private_user" ALTER COLUMN "createdAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_private"."private_user" ALTER COLUMN "updatedAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_public"."site" ALTER COLUMN "createdBy" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_public"."site" ALTER COLUMN "updatedBy" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_public"."site" ALTER COLUMN "createdAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_public"."site" ALTER COLUMN "updatedAt" DROP NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_84ba6c4fcf05623316884391f1" ON "app_public"."site" ("name") `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "app_public"."IDX_84ba6c4fcf05623316884391f1"`);
        await queryRunner.query(`ALTER TABLE "app_public"."site" ALTER COLUMN "updatedAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_public"."site" ALTER COLUMN "createdAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_public"."site" ALTER COLUMN "updatedBy" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_public"."site" ALTER COLUMN "createdBy" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_private"."private_user" ALTER COLUMN "updatedAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_private"."private_user" ALTER COLUMN "createdAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_private"."private_user" ALTER COLUMN "updatedBy" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_private"."private_user" ALTER COLUMN "createdBy" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_public"."user" ALTER COLUMN "updatedAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_public"."user" ALTER COLUMN "createdAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_public"."user" ALTER COLUMN "updatedBy" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_public"."user" ALTER COLUMN "createdBy" SET NOT NULL`);
    }

}
