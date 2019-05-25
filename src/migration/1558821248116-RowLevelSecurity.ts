import {MigrationInterface, QueryRunner} from "typeorm";

const tables = ['user', 'site', 'post', 'asset', 'category']
const userId = `current_setting('claims.userId', true)::text`

export class Migration1558821248116 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await this.enableRls(queryRunner, 'user');
        await queryRunner.query(`CREATE POLICY "select_user" ON "app_public"."user" FOR SELECT USING ("id"::text=${userId})`)
        await queryRunner.query(`CREATE POLICY "update_user" ON "app_public"."user" FOR UPDATE USING ("id"::text=${userId})`)
        
        await this.createRlsPolicyAndEnable(queryRunner, 'site', `(SELECT count(*) FROM "app_public"."site_users_user" su WHERE su."siteId"="id" AND su."userId"::text=${userId}) > 0`, true);
        await this.createRlsPolicyAndEnable(queryRunner, 'site_users_user', `"userId"::text=${userId}`, true);

        const oneToManyPolicyText = (table: string) => `(SELECT count(*) FROM "app_public"."site_users_user" su WHERE su."siteId"="app_public"."${table}"."siteId" AND su."userId"::text=${userId}) > 0`
        const manyToManyPolicyText = (table: string, owner: string, column: string) => `(select count(*) from "app_public"."site_users_user" su WHERE su."siteId"=(
            select p."siteId" from "app_public"."${owner}" p
            where p."id"="app_public"."${table}"."${column}"
          ) AND su."userId"::text=current_setting('claims.userId', true)::text) > 0`

        await this.createRlsPolicyAndEnable(queryRunner, 'post', oneToManyPolicyText('post'));
        await this.createRlsPolicyAndEnable(queryRunner, 'asset', oneToManyPolicyText('asset'));
        await this.createRlsPolicyAndEnable(queryRunner, 'category', oneToManyPolicyText('category'));
        await this.createRlsPolicyAndEnable(queryRunner, 'post_categories_category', manyToManyPolicyText('post_categories_category', 'post', 'postId'));
        await this.createRlsPolicyAndEnable(queryRunner, 'post_assets_asset', manyToManyPolicyText('post_assets_asset', 'post', 'postId'));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await this.dropRlsPolicyAndDisable(queryRunner, 'post_assets_asset');
        await this.dropRlsPolicyAndDisable(queryRunner, 'post_categories_category');
        await this.dropRlsPolicyAndDisable(queryRunner, 'category');
        await this.dropRlsPolicyAndDisable(queryRunner, 'asset');
        await this.dropRlsPolicyAndDisable(queryRunner, 'post');

        await this.dropRlsPolicyAndDisable(queryRunner, 'site_users_user');
        await this.dropRlsPolicyAndDisable(queryRunner, 'site');

        await queryRunner.query(`DROP POLICY "update_user" ON "app_public"."user"`)
        await queryRunner.query(`DROP POLICY "select_user" ON "app_public"."user"`)
        await this.disableRls(queryRunner, 'user');
    }

    private async enableRls(queryRunner: QueryRunner, table: string): Promise<any> {
        await queryRunner.query(`ALTER TABLE "app_public"."${table}" ENABLE ROW LEVEL SECURITY`);
    }

    private async disableRls(queryRunner: QueryRunner, table: string): Promise<any> {
        await queryRunner.query(`ALTER TABLE "app_public"."${table}" DISABLE ROW LEVEL SECURITY`);
    }

    private async createRlsPolicyAndEnable(queryRunner: QueryRunner, table: string, expression: string, withCheck = false): Promise<any> {
        await this.enableRls(queryRunner, table);
        await queryRunner.query(`CREATE POLICY "rls_${table}" ON "app_public"."${table}" FOR ALL USING (${expression})` + (withCheck ? ` WITH CHECK (${expression})` : ''))
    }

    private async dropRlsPolicyAndDisable(queryRunner: QueryRunner, table: string): Promise<any> {
        await queryRunner.query(`DROP POLICY "rls_${table}" ON "app_public"."${table}"`)
        await this.disableRls(queryRunner, table);
    }

}
