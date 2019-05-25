import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1558811886481 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "app_public"."IDX_6ddf38255a19a4cb06d55a78c2"`);
        await queryRunner.query(`DROP INDEX "app_public"."IDX_84ba6c4fcf05623316884391f1"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_6ddf38255a19a4cb06d55a78c2" ON "app_public"."user" ("email") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_84ba6c4fcf05623316884391f1" ON "app_public"."site" ("name") `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "app_public"."IDX_84ba6c4fcf05623316884391f1"`);
        await queryRunner.query(`DROP INDEX "app_public"."IDX_6ddf38255a19a4cb06d55a78c2"`);
        await queryRunner.query(`CREATE INDEX "IDX_84ba6c4fcf05623316884391f1" ON "app_public"."site" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_6ddf38255a19a4cb06d55a78c2" ON "app_public"."user" ("email") `);
    }

}
