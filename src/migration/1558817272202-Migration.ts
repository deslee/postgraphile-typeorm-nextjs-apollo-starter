import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1558817272202 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "app_public"."post_categories_category" ("postId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_729f5fdc0c1d852ea97ff342269" PRIMARY KEY ("postId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2539b9732c1247c5fff5b81939" ON "app_public"."post_categories_category" ("postId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8f11a390224d9ed0319c7bd853" ON "app_public"."post_categories_category" ("categoryId") `);
        await queryRunner.query(`CREATE TABLE "app_public"."site_users_user" ("siteId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_1be35a3f0943d73543ed4025d7a" PRIMARY KEY ("siteId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_537b98c3979231699781c22b5c" ON "app_public"."site_users_user" ("siteId") `);
        await queryRunner.query(`CREATE INDEX "IDX_bdfa4899ea9d8396eaf82ceebe" ON "app_public"."site_users_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "app_public"."post_categories_category" ADD CONSTRAINT "FK_2539b9732c1247c5fff5b81939b" FOREIGN KEY ("postId") REFERENCES "app_public"."post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app_public"."post_categories_category" ADD CONSTRAINT "FK_8f11a390224d9ed0319c7bd8539" FOREIGN KEY ("categoryId") REFERENCES "app_public"."category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app_public"."site_users_user" ADD CONSTRAINT "FK_537b98c3979231699781c22b5c5" FOREIGN KEY ("siteId") REFERENCES "app_public"."site"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app_public"."site_users_user" ADD CONSTRAINT "FK_bdfa4899ea9d8396eaf82ceebec" FOREIGN KEY ("userId") REFERENCES "app_public"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "app_public"."site_users_user" DROP CONSTRAINT "FK_bdfa4899ea9d8396eaf82ceebec"`);
        await queryRunner.query(`ALTER TABLE "app_public"."site_users_user" DROP CONSTRAINT "FK_537b98c3979231699781c22b5c5"`);
        await queryRunner.query(`ALTER TABLE "app_public"."post_categories_category" DROP CONSTRAINT "FK_8f11a390224d9ed0319c7bd8539"`);
        await queryRunner.query(`ALTER TABLE "app_public"."post_categories_category" DROP CONSTRAINT "FK_2539b9732c1247c5fff5b81939b"`);
        await queryRunner.query(`DROP INDEX "app_public"."IDX_bdfa4899ea9d8396eaf82ceebe"`);
        await queryRunner.query(`DROP INDEX "app_public"."IDX_537b98c3979231699781c22b5c"`);
        await queryRunner.query(`DROP TABLE "app_public"."site_users_user"`);
        await queryRunner.query(`DROP INDEX "app_public"."IDX_8f11a390224d9ed0319c7bd853"`);
        await queryRunner.query(`DROP INDEX "app_public"."IDX_2539b9732c1247c5fff5b81939"`);
        await queryRunner.query(`DROP TABLE "app_public"."post_categories_category"`);
    }

}
