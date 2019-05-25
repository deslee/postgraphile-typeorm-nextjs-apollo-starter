import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1558812288856 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "app_public"."site" ADD CONSTRAINT "UQ_84ba6c4fcf05623316884391f15" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "app_public"."site" DROP CONSTRAINT "UQ_84ba6c4fcf05623316884391f15"`);
    }

}
