import { ConnectionOptions } from 'typeorm'

import { config } from '.'

const configORM: ConnectionOptions = {
  type: 'postgres',
  host: config.pg_host,
  port: config.pg_port,
  username: config.pg_user,
  password: config.pg_pass,
  database: config.pg_db,
  entities: [__dirname + 'entity/model/**/*{.ts,.js}'],
  migrationsRun: true,
  synchronize: true,
  logging: true,
  logger: 'file',
  migrations: [__dirname + 'entity/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/entity/migrations',
  },
}

export default configORM
