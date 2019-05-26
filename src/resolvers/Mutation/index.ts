import { Mutation as BindMutation } from 'src/generated/postgraphile';
import * as bcrypt from 'bcryptjs';
import { proxyFor } from '../utils';
import { Context } from '../../Context'
import { Site } from '../../entity/Site';
import { PrivateUser, User } from '../../entity/User';
import { User as GqlUser, RegisterMutationArgs, RegisterPayload } from 'src/generated/types';
import { ApolloError, AuthenticationError } from 'apollo-server-errors';
import { signToken, createSession, createUser } from '../../Authentication';
import { LoginMutationArgs, LoginPayload } from 'src/generated/types';

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

    async login(parent: any, { email, password }: LoginMutationArgs, ctx: Context, info: any): Promise<LoginPayload> {
        return await ctx.orm.transaction(async tx => {
            const userInfo = await tx.findOne(PrivateUser, { user: { email: email } });

            if (!userInfo) {
                throw new ApolloError(`No such user found for email: ${email}`, 'NOT_FOUND');
            }

            const valid = await bcrypt.compare(password, userInfo.password);
            if (!valid) {
                throw new AuthenticationError('Invalid password');
            }

            const session = await createSession(tx, userInfo.user)

            return {
                token: signToken({
                    sessionId: session.token,
                    userId: session.user.id
                })
            }
        })
    },

    async register(parent: any, { email, password }: RegisterMutationArgs, ctx: Context, info: any): Promise<RegisterPayload> {
        return await ctx.orm.transaction(async tx => {
            var privateUser = await createUser({ tx: tx, email, password })
            const session = await createSession(tx, privateUser.user)

            return {
                userId: privateUser.user.id,
                token: signToken({
                    sessionId: session.token,
                    userId: session.user.id
                })
            }
        })
    }
}