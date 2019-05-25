import { Context } from '../Context';
import { switchCase, isUserWhitespacable } from 'babel-types';

export default {
    async sites(parent: any, args: any, ctx: Context, info: any) {
        return await ctx.gql.query.sites(args, info);
    },

    async users(parent: any, args: any, ctx: Context, info: any) {
        return await ctx.gql.query.users(args, info);
    },

    async userByEmail(parent: any, args: any, ctx: Context, info: any) {
        return await ctx.gql.query.userByEmail(args, info);
    }
}