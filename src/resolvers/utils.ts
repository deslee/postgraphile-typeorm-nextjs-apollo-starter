import { Context } from '../Context';

export function proxyFor<T>(types: (keyof T)[], resolver: (ctx: Context) => T) {
    return types.map(name => ({
        [name]: async (parent: any, args: any, ctx: Context, info: any) => {
            const binding = resolver(ctx)[name] as any;
            return await binding(args, info)
        }
    })).reduce((prev, cur) => Object.assign(prev, cur))
}