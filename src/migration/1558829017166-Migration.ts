import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1558829017166 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "app_private"."private_user" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "app_private"."private_user" ADD CONSTRAINT "UQ_73a28ecb5889717453014064d7a" UNIQUE ("userId")`);
        await queryRunner.query(`CREATE INDEX "IDX_73a28ecb5889717453014064d7" ON "app_private"."private_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "app_private"."private_user" ADD CONSTRAINT "FK_73a28ecb5889717453014064d7a" FOREIGN KEY ("userId") REFERENCES "app_public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "app_private"."private_user" DROP CONSTRAINT "FK_73a28ecb5889717453014064d7a"`);
        await queryRunner.query(`DROP INDEX "app_private"."IDX_73a28ecb5889717453014064d7"`);
        await queryRunner.query(`ALTER TABLE "app_private"."private_user" DROP CONSTRAINT "UQ_73a28ecb5889717453014064d7a"`);
        await queryRunner.query(`ALTER TABLE "app_private"."private_user" DROP COLUMN "userId"`);
    }

}
