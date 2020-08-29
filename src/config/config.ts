import dotenv from 'dotenv'
dotenv.config();

export default {
  environment: process.env.NODE_ENV,
  port: process.env.PORT,
  host: process.env.HOST,
  pg_port: process.env.POSTGRES_PORT,
  pg_host: process.env.POSTGRES_HOST,
  pg_db: process.env.POSTGRES_DB,
  pg_user: process.env.POSTGRES_USER,
  pg_pass: process.env.POSTGRES_PASSWORD,
}as const
