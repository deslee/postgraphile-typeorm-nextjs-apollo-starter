import * as express from 'express'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import { Binding, BindingConstructor } from './generated/postgraphile';
import { importSchema } from 'graphql-import';
import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server-express';
import { createConnection, Connection } from 'typeorm';
import * as ormconfig from './ormconfig';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import resolvers from './resolvers';
import config from './config';
import * as next from 'next';
import { makeBindingClass } from 'graphql-binding';
import { schemaFactory } from './embeddedPostgraphile';
import { init as initAuthentication, getToken, auth, AuthenticatedUser } from './Authentication';
import { parse } from 'url';
import { SchemaLink } from 'apollo-link-schema';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';

const contextProvider = (ormConnection: Connection) => (c: ExpressContext) => {
    // We need a custom binding class to inject the user info into the postgraphile context's locals
    const CustomBinding = makeBindingClass<BindingConstructor<Binding>>({
        schema: schemaFactory({
            'claims.userId': c.req.user ? c.req.user.userId : undefined,
            'claims.role': c.req.user ? 'le3io_user' : undefined
        })
    });

    return {
        ...c,
        orm: ormConnection,
        gql: new CustomBinding(),
        elevatedGql: (user?: AuthenticatedUser) => {
            const ElevatedBinding = makeBindingClass<BindingConstructor<Binding>>({
                schema: schemaFactory({
                    'claims.userId': user ? user.userId : undefined,
                    'claims.role': user ? 'le3io_user' : undefined
                })
            })
            return new ElevatedBinding()
        },
        req: c.req as any
    }
}

async function main() {
    const app = express();
    const ormConnection = await createConnection(ormconfig as PostgresConnectionOptions)

    // basic middleware
    app.use(cors())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded())

    initAuthentication({ orm: ormConnection })

    app.use('/token', getToken)
    app.use(auth)

    // graphql
    const typeDefs = gql(importSchema(__dirname + '/schema.graphql'));
    new ApolloServer({
        typeDefs,
        resolvers: { ...resolvers },
        context: (c) => contextProvider(ormConnection)(c)
    }).applyMiddleware({ app })

    // nextjs
    const nextApp = next({ dev: config.env === 'development', dir: __dirname })
    const nextHandler = nextApp.getRequestHandler();
    await nextApp.prepare();
    const nextMiddleware: express.RequestHandler = (req, res) => {
        const parsedUrl = parse(req.url, true);
        const { pathname, query } = parsedUrl;

        // attach a schemalink to the request for the next app to use
        // the schemalink will be an alternative to http for querying graphql
        const schemaLink = new SchemaLink({
            schema: makeExecutableSchema({
                typeDefs,
                resolvers: { ...resolvers },
            }),
            context: (c) => {
                return {
                    ...c.getContext(),
                    ...contextProvider(ormConnection)({ req, res })
                }
            }
        });

        (req as any).link = schemaLink

        if (pathname === '/a') {
            nextApp.render(req, res, '/b', query);
        } else if (pathname === '/b') {
            nextApp.render(req, res, '/a', query);
        } else {
            nextHandler(req, res, parsedUrl);
        }
    }
    app.use(nextMiddleware)

    app.listen(config.port, '0.0.0.0', () => {
        console.log(`Server is running on port ${config.port}`);
    })
}

main().catch(err => console.error(err));