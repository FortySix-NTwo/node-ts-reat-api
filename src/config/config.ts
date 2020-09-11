import * as dotenv from 'dotenv'

dotenv.config()
let path
switch (process.env.NODE_ENV) {
  case 'test':
    path = `${__dirname}/../../.env.test`
    break
  case 'production':
    path = `${__dirname}/../../.env.production`
    break
  default:
    path = `${__dirname}/../../.env.development`
}
dotenv.config({ path })

export default {
  environment: String(process.env.NODE_ENV),
  port: Number(process.env.PORT),
  host: String(process.env.HOST),
  ws_port: Number(process.env.WEB_SOCKET_PORT),
  ws_endpoint: String(process.env.SOCKET_ENDPOINT),
  typeorm_port: Number(process.env.TYPEORM_PORT),
  typeorm_host: String(process.env.TYPEORM_HOST),
  typeorm_connection: String(process.env.TYPEORM_CONNECTION),
  typeorm_user: String(process.env.TYPEORM_USERNAME),
  typeorm_password: String(process.env.TYPEORM_PASSWORD),
  typeorm_database: String(process.env.TYPEORM_DATABASE),
  typeorm_synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE),
  typeorm_logging: Boolean(process.env.TYPEORM_LOGGING),
  typeorm_logger: String(process.env.TYPEORM_LOGGER),
  typeorm_entities_dir: String(process.env.TYPEORM_ENTITIES),
  typeorm_migrations_dir: String(process.env.TYPEORM_MIGRATIONS_DIR),
  typeorm_migrations: String(process.env.TYPEORM_MIGRATIONS),
  redis_url: String(process.env.REDIS_URL),
  jwt_secret: String(process.env.JWT),
  jwt_exp: String(process.env.JWT_EXP),
  sentry_dsn: String(process.env.SENTRY_DSN),
  https_port: Number(process.env.HTTPS_PORT),
  domain: String(process.env.DOMAIN),
}
