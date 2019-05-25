import * as express from 'express'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import { Binding, BindingConstructor } from './generated/postgraphile';
import { importSchema } from 'graphql-import';
import { ApolloServer, gql } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import * as ormconfig from '../ormconfig';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import resolvers from './resolvers';
import config from '../config';
import { makeBindingClass } from 'graphql-binding';
import { schemaFactory } from './embeddedPostgraphile';

async function main() {
    const app = express();

    // basic middleware
    app.use(cors())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded())

    // graphql
    const ormConnection = await createConnection(ormconfig as PostgresConnectionOptions)
    const typeDefs = gql(importSchema(__dirname + '/schema.graphql'));
    new ApolloServer({
        typeDefs,
        resolvers,
        context: (c) => {
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
                req: c.req as any
            }
        }
    }).applyMiddleware({ app })

    app.listen(config.port, '0.0.0.0', () => {
        console.log(`Server is running on port ${config.port}`);
    })
}

main().catch(err => console.error(err));