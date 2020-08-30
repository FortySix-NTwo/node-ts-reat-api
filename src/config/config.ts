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
  pg_host: process.env.POSTGRES_HOST,
  pg_db: process.env.POSTGRES_DB,
  pg_user: process.env.POSTGRES_USER,
  pg_pass: process.env.POSTGRES_PASSWORD,
  redis_url: process.env.REDIS_URL,
}
