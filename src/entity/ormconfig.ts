import { ConnectionOptions } from 'typeorm';
import { config } from 'config';

export default {
  type: 'postgres',
  host: config.pg_host,
  port: config.pg_port,
  username: config.pg_user,
  password: config.pg_pass,
  database: config.pg_db,
  entities: [__dirname + 'entity/model/**/*{.ts,.js}'],
  migrationsRun: true,
  logging: true,
  logger: 'file',
  migrations: [__dirname + 'entity/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/entity/migrations',
  },
}as Parameters<typeof ConnectionOptions>[0]
