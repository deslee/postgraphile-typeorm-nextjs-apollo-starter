import { PostGraphileOptions } from 'postgraphile';
import PgSimplifyInflectorPlugin from '@graphile-contrib/pg-simplify-inflector';
import config from '../../config'

export const postGraphileOptions: PostGraphileOptions = {
    appendPlugins: [
        PgSimplifyInflectorPlugin // simplified field names
    ],
    dynamicJson: true,
    showErrorStack: config.env !== 'production',
    extendedErrors: config.env !== 'production' ? ['hint'] : [],
    graphiql: false,
    simpleCollections: 'only',
    legacyRelations: 'omit',
    graphileBuildOptions: {
        pgOmitListSuffix: true
    },
    pgSettings: async req => {
        return {
            'claims.role': 'le3io_user'
        }
    }
}