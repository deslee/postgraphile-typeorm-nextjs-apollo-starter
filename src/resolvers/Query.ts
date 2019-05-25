import { Query as BindQuery } from '../generated/postgraphile';
import { proxyFor } from './utils';

const Query = {
    ...proxyFor<BindQuery>([
        'sites',
        'site',
        'siteByName',
        'users',
        'userByEmail',
        'user'
    ], ctx => ctx.gql.query)
}

export default Query;