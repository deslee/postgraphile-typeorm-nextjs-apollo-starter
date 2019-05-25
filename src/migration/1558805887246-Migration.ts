import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1558805887246 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "app_public"."user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "data" jsonb NOT NULL, "createdBy" character varying NOT NULL, "updatedBy" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, CONSTRAINT "UQ_6ddf38255a19a4cb06d55a78c21" UNIQUE ("email"), CONSTRAINT "PK_fc95dfc79cb22e97c506c853ded" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6ddf38255a19a4cb06d55a78c2" ON "app_public"."user" ("email") `);
        await queryRunner.query(`CREATE TABLE "app_private"."private_user" ("id" SERIAL NOT NULL, "password" character varying NOT NULL, "createdBy" character varying NOT NULL, "updatedBy" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_c83614eed38fa9dc593698c3dc8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "app_private"."session" ("token" SERIAL NOT NULL, "invalidAfter" TIMESTAMP NOT NULL, "data" character varying NOT NULL, "userId" integer, CONSTRAINT "REL_9844c9da57879f119027c87e5e" UNIQUE ("userId"), CONSTRAINT "PK_b7be6b0b96d77b6b56977dc372b" PRIMARY KEY ("token"))`);
        await queryRunner.query(`CREATE TABLE "app_public"."site" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "data" jsonb NOT NULL, "createdBy" character varying NOT NULL, "updatedBy" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_872fad86a8535267b7324e6bce0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "app_private"."session" ADD CONSTRAINT "FK_9844c9da57879f119027c87e5e0" FOREIGN KEY ("userId") REFERENCES "app_public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "app_private"."session" DROP CONSTRAINT "FK_9844c9da57879f119027c87e5e0"`);
        await queryRunner.query(`DROP TABLE "app_public"."site"`);
        await queryRunner.query(`DROP TABLE "app_private"."session"`);
        await queryRunner.query(`DROP TABLE "app_private"."private_user"`);
        await queryRunner.query(`DROP INDEX "app_public"."IDX_6ddf38255a19a4cb06d55a78c2"`);
        await queryRunner.query(`DROP TABLE "app_public"."user"`);
    }

}
