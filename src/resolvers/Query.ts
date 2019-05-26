import { Query as BindQuery } from '../generated/postgraphile';
import { proxyFor } from './utils';
import { User as GqlUser } from '../generated/types';
import { Context } from '../Context'

const Query = {
    ...proxyFor<BindQuery>([
        'sites',
        'site',
        'siteByName',
        'users',
        'userByEmail',
        'user'
    ], ctx => ctx.gql.query),

    async me(parent: any, args: any, ctx: Context, info: any): Promise<Partial<GqlUser> | undefined | null> {
        if (ctx.req.user && ctx.req.user.userId) {
            return ctx.gql.query.user({ id: ctx.req.user.userId }, info)
        }

        return undefined;
    }
}

export default Query;