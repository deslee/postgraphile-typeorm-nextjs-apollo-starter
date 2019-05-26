import {
    withPostGraphileContext,
    createPostGraphileSchema,
    PostGraphileOptions
} from 'postgraphile';

import { makeRemoteExecutableSchema } from 'graphql-tools';
import * as fs from 'fs';
import { FetcherOperation } from 'graphql-tools/dist/stitching/makeRemoteExecutableSchema';
import { execute, GraphQLSchema } from 'graphql';
import { Pool } from 'pg';
import config from '../../config';
import { postGraphileOptions } from './config'

let _schema: GraphQLSchema;
type Locals = {[key: string]: {} | string | number | boolean | undefined | null};
const getSchema = async () => {
    if (!_schema) {
        _schema = await createPostGraphileSchema(
            config.db.url(),
            config.db.schema,
            postGraphileOptions
        );
        return _schema;
    } else {
        return _schema;
    }
};

let pgPool: Pool | undefined = undefined;
function initPgPool() {
    pgPool = new Pool({ connectionString: config.db.url() });
    return pgPool;
}

const fetcherFactory = (locals?: Locals) => async (operation: FetcherOperation) => {
    const graphqlContext = operation.context
        ? operation.context.graphqlContext
        : {};

    const postGraphileContextOptions = {
        ...postGraphileOptions,
        ...graphqlContext,
        pgSettings: locals !== undefined ? locals : undefined,
        pgPool: pgPool || initPgPool()
    };
    const postgraphileSchema = await getSchema();
    const result = withPostGraphileContext(postGraphileContextOptions, async (context) =>
        await execute(
            postgraphileSchema,
            operation.query,
            null,
            {
                ...context
            },
            operation.variables,
            operation.operationName
        )
    );
    return result;
};

const typeDefs = fs.readFileSync('./src/generated/postgraphile.graphql', 'utf-8');

export const schemaFactory: (locals?: Locals) => GraphQLSchema = (locals) => makeRemoteExecutableSchema({ fetcher: fetcherFactory(locals), schema: typeDefs })

export default schemaFactory();