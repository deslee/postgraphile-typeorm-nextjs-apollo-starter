import config from './config'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const ormconfig: PostgresConnectionOptions = {
    type: 'postgres',
    host: config.db.host,
    port: config.db.port,
    username: config.db.adminUser.name,
    password: config.db.adminUser.pass,
    database: config.db.name,
    schema: 'public',
    logging: true,
    migrationsRun: false,
    entities: [
        "src/entity/**/*"
    ],
    migrations: [
        "src/migration/**/*"
    ]
}

module.exports = ormconfig;
