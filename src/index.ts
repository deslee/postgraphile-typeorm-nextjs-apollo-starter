import * as express from 'express'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import { Binding } from './generated/postgraphile';
import { importSchema } from 'graphql-import';
import { ApolloServer, gql } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import * as ormconfig from '../ormconfig';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import resolvers from './resolvers';
import config from '../config';

async function main() {
    const app = express();

    // basic middleware
    app.use(cors())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded())

    // graphql
    const ormConnection = createConnection(ormconfig as PostgresConnectionOptions)
    const typeDefs = gql(importSchema(__dirname + '/schema.graphql'));
    new ApolloServer({
        typeDefs,
        resolvers,
        context: (c) => ({
            ...c,
            orm: ormConnection,
            gql: new Binding()
        })
    }).applyMiddleware({ app })

    app.listen(config.port, '0.0.0.0', () => {
        console.log(`Server is running on port ${config.port}`);
    })
}

main().catch(err => console.error(err));