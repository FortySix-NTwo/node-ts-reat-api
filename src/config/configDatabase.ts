import { createConnection, ConnectionOptions } from 'typeorm'
import 'reflect-metadata'

import { config } from './index'

const { pg_host, pg_port, pg_user, pg_pass, pg_db } = config

const configORM: ConnectionOptions = {
  type: 'postgres',
  host: pg_host,
  port: pg_port,
  username: pg_user,
  password: pg_pass,
  database: pg_db,
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

export const configDB = async () => {
  try {
    await createConnection(configORM)
  } catch (error) {
    throw new Error(error)
  }
}
