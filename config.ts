import * as convict from 'convict'

const config = convict({
    env: {
        format: ['development', 'test', 'production'],
        default: 'development',
        env: 'NODE_ENV'
    },
    db: {
        host: {
            format: 'ipaddress',
            default: '127.0.0.1',
            env: 'DB_HOST'
        },
        port: {
            format: 'port',
            default: 5432,
            env: 'DB_PORT'
        },
        user: {
            format: String,
            default: 'postgres',
            env: 'DB_USER'
        },
        pass: {
            format: String,
            default: 'password',
            env: 'DB_PASS'
        },
        name: {
            format: String,
            default: 'le3io',
            env: 'DB_NAME'
        },
        schema: {
            format: String,
            default: 'app_public',
            env: 'DB_SCHEMA'
        }
    }
})

config.loadFile(`./config.${config.get('env')}.json`)
config.validate({allowed: 'strict'})

export default {
    env: config.get('env') as 'development' | 'test' | 'production',
    db: (db => ({
        host: db.host,
        port: db.port as number,
        user: db.user,
        pass: db.pass,
        name: db.name,
        schema: db.schema,
        url: `postgres://${db.user}:${db.pass}@${db.host}:${db.port}/${db.name}`
    }))(config.get('db'))
};