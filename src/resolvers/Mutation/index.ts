import { Mutation as BindMutation } from 'src/generated/postgraphile';
import { proxyFor } from '../utils';

export default {
    ...proxyFor<BindMutation>([
        'createSite',
        'createUser',
        'updateSite',
        'updateSiteByName',
        'updateUserByEmail',
        'deleteSite',
        'deleteUser',
        'deleteSiteByName',
        'deleteUserByEmail'
    ], ctx => ctx.gql.mutation)
}