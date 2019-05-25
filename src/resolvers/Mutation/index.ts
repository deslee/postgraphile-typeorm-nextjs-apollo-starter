import { Mutation as BindMutation } from 'src/generated/postgraphile';
import { proxyFor } from '../utils';
import { Context } from '../../Context'
import { Site } from '../../entity/Site';

export default {
    ...proxyFor<BindMutation>([
        'createUser',
        'updateSite',
        'updateSiteByName',
        'updateUserByEmail',
        'deleteSite',
        'deleteUser',
        'deleteSiteByName',
        'deleteUserByEmail'
    ], ctx => ctx.gql.mutation),

    async createSite(parent: any, args: any, ctx: Context, info: any) {
        const site = await ctx.orm.getRepository(Site).save({
            ...args.input.site,
            users: [ctx.req.user.id]
        })

        return {
            site: site
        }
    },

    async createUser(parent: any, args: any, ctx: Context, info: any) {

    }
}