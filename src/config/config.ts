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
  pg_port: Number(process.env.POSTGRES_PORT),
  pg_host: String(process.env.POSTGRES_HOST),
  pg_db: String(process.env.POSTGRES_DB),
  pg_user: String(process.env.POSTGRES_USER),
  pg_pass: String(process.env.POSTGRES_PASSWORD),
  redis_url: String(process.env.REDIS_URL),
  jwt_secret: String(process.env.JWT),
  jwt_exp: String(process.env.JWT_EXP),
  sentry_dsn: String(process.env.SENTRY_DSN),
  https_port: Number(process.env.HTTPS_PORT),
  domain: String(process.env.DOMAIN),
}
