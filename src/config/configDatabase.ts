import { createConnection, Connection } from 'typeorm'

import { User } from '../entity'
import { config, appLogger } from './index'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

const {
  typeorm_connection,
  typeorm_entities_dir,
  typeorm_host,
  typeorm_logging,
  typeorm_logger,
  typeorm_migrations,
  typeorm_migrations_dir,
  typeorm_password,
  typeorm_database,
  typeorm_port,
  typeorm_synchronize,
  typeorm_user,
} = config

export const configORM: PostgresConnectionOptions = {
  type: typeorm_connection as 'postgres',
  host: typeorm_host,
  port: typeorm_port,
  username: typeorm_user,
  password: typeorm_password,
  database: typeorm_database,
  entities: [User],
  migrationsRun: typeorm_synchronize,
  synchronize: typeorm_synchronize,
  logging: typeorm_logging,
  logger: typeorm_logger as 'file',
  migrations: [typeorm_migrations],
  cli: {
    migrationsDir: typeorm_migrations_dir,
    entitiesDir: typeorm_entities_dir,
  },
}

export const configDB = async (
  config: PostgresConnectionOptions
): Promise<Connection> => {
  try {
    const db = await createConnection(config)
    appLogger.info(`Postgres database connected`)
    return db
  } catch (error) {
    throw new Error(error)
  }
}
