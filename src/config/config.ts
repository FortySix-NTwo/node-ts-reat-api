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
  pg_port: Number(process.env.POSTGRES_PORT),
  pg_host: String(process.env.POSTGRES_HOST),
  pg_db: String(process.env.POSTGRES_DB),
  pg_user: String(process.env.POSTGRES_USER),
  pg_pass: String(process.env.POSTGRES_PASSWORD),
  redis_url: String(process.env.REDIS_URL),
  jwt_secret: String(process.env.JWT),
  sentry_dsn: String(process.env.SENTRY_DSN),
  package_name: String(process.env.APP_NAME),
  package_version: String(process.env.APP_VERSION),
}
