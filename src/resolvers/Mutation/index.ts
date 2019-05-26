import { Mutation as BindMutation } from 'src/generated/postgraphile';
import * as bcrypt from 'bcryptjs';
import { proxyFor } from '../utils';
import { Context } from '../../Context'
import { Site } from '../../entity/Site';
import { PrivateUser, User } from '../../entity/User';
import { ApolloError, AuthenticationError } from 'apollo-server-errors';
import { signToken, createSession } from '../../Authentication';

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

    async login(parent: any, { email, password }: any, ctx: Context, info: any) {
        const userInfo = await ctx.orm.manager.findOne(PrivateUser, { user: { email: email } });

        if (!userInfo) {
            throw new ApolloError(`No such user found for email: ${email}`, 'NOT_FOUND');
        }

        const valid = await bcrypt.compare(password, userInfo.password);
        if (!valid) {
            throw new AuthenticationError('Invalid password');
        }

        const session = await createSession(ctx.orm, userInfo.user)

        return {
            user: userInfo.user,
            token: signToken({
                sessionId: session.token,
                userId: session.user.id
            })
        }
    },

    async register(parent: any, { email, password }: any, ctx: Context, info: any) {
        const pw = await bcrypt.hash(password, 10);
        await ctx.orm.getRepository(User).insert({
            email,
            data: '{}'
        })

        const user = await ctx.orm.getRepository(User).findOne({ email })

        if (!user) {
            throw new AuthenticationError('Failed to save');
        }

        await ctx.orm.getRepository(PrivateUser).insert({
            user: user,
            password: pw
        })

        const privateUser = await ctx.orm.getRepository(PrivateUser).findOne({ user: { id: user.id } })

        if (!privateUser) {
            throw new AuthenticationError('Failed to save');
        }

        const session = await createSession(ctx.orm, privateUser!.user)

        return {
            user,
            token: signToken({
                sessionId: session.token,
                userId: session.user.id
            })
        }
    }
}