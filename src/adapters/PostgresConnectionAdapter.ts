import { createConnection, ConnectionOptions, Connection } from 'typeorm'
import 'reflect-metadata'

import { User } from '../entity'
import { options } from '../config'
import { Logger } from '../adapters'

export class ConnectionAdapter {
  private readonly config = options
  private readonly logger = Logger('DBLogger')
  public connect = async (): Promise<Connection> => {
    const configORM: ConnectionOptions = {
      type: 'postgres',
      host: this.config.typeorm_host,
      port: this.config.typeorm_port,
      username: this.config.typeorm_user,
      password: this.config.typeorm_password,
      database: this.config.typeorm_database,
      entities: [User],
      migrationsRun: this.config.typeorm_synchronize,
      synchronize: this.config.typeorm_synchronize,
      logging: this.config.typeorm_logging,
      logger: 'file',
      migrations: [this.config.typeorm_migrations],
      cli: {
        migrationsDir: this.config.typeorm_migrations_dir,
        entitiesDir: this.config.typeorm_entities_dir,
      },
    }
    try {
      const ormDB = await createConnection(configORM)
      this.logger.info(`Postgres database connected`)
      return ormDB
    } catch (error) {
      throw new Error(error)
    }
  }
}

export const connectionAdapter = new ConnectionAdapter().connect()
