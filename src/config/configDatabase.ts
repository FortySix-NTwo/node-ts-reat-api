import { createConnection, ConnectionOptions } from 'typeorm'
import 'reflect-metadata'

import { User } from '../entity'
import { config, appLogger } from './index'

//TODO: change to Factory pattern (i.e builder)
export const configDB = async () => {
  const { pg_host, pg_port, pg_user, pg_pass, pg_db } = config
  const configORM: ConnectionOptions = {
    type: 'postgres',
    host: pg_host,
    port: pg_port,
    username: pg_user,
    password: pg_pass,
    database: pg_db,
    entities: [User],
    migrationsRun: true,
    synchronize: true,
    logging: true,
    logger: 'file',
    migrations: ['src/entity/migrations'],
    cli: {
      migrationsDir: 'src/entity/migrations',
    },
  }
  try {
    await createConnection(configORM)
    appLogger.info(`Postgres database connected`)
  } catch (error) {
    throw new Error(error)
  }
}
