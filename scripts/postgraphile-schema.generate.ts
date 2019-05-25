import config from '../config'
import postgraphile from 'postgraphile';
import { postGraphileOptions } from '../src/embeddedPostgraphile/config';

postgraphile(
    config.db.url,
    config.db.schema,
    {
        ...postGraphileOptions,
        exportGqlSchemaPath: './src/generated/postgraphile.graphql'
    }
)