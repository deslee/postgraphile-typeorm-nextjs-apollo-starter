import config from './config'

const ormconfig = {
    type: 'postgres',
    host: config.db.host,
    port: config.db.port,
    username: config.db.user,
    password: config.db.pass,
    database: config.db.name,
    schema: 'public',
    "logging": true,
    "migrationsRun": false,
    "entities": [
        "src/entity/**/*"
    ],
    "migrations": [
        "src/migration/**/*"
    ]
}

module.exports = ormconfig;
