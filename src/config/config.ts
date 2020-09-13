import * as dotenv from 'dotenv'

dotenv.config()
let path
switch (process.env.NODE_ENVIRONMENT) {
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
  app_host: String(process.env.APPLICATION_HOST),
  app_port: Number(process.env.APPLICATION_PORT),
  jwt_exp: Number(process.env.JWT_EXP),
  jwt_secret: String(process.env.JWT_SECRET),
  logger_exceptions: Boolean(process.env.LOGGER_EXCEPTIONS),
  node_environment: String(process.env.NODE_ENVIRONMENT),
  redis_url: String(process.env.REDIS_URL),
  sentry_dsn: String(process.env.SENTRY_DSN),
  typeorm_connection: String(process.env.TYPEORM_CONNECTION),
  typeorm_database: String(process.env.TYPEORM_DATABASE),
  typeorm_entities_dir: String(process.env.TYPEORM_ENTITIES_DIR),
  typeorm_host: String(process.env.TYPEORM_HOST),
  typeorm_logger: String(process.env.TYPEORM_LOGGER),
  typeorm_logging: Boolean(process.env.TYPEORM_LOGGING),
  typeorm_migrations: String(process.env.TYPEORM_MIGRATIONS),
  typeorm_migrations_dir: String(process.env.TYPEORM_MIGRATIONS_DIR),
  typeorm_password: String(process.env.TYPEORM_PASSWORD),
  typeorm_synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE),
  typeorm_user: String(process.env.TYPEORM_USERNAME),
  typeorm_port: Number(process.env.TYPEORM_PORT),
  ws_endpoint: String(process.env.WEB_SOCKET_ENDPOINT),
  ws_port: Number(process.env.WEB_SOCKET_PORT),
}
