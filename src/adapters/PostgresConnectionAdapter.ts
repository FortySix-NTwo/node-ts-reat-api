import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { createConnection, Connection } from 'typeorm'
import { injectable, inject } from 'inversify'

import { User } from '../entity'
import { Config } from '../config'
import { BaseLogger } from '../adapters'

@injectable()
export class ConnectionAdapter {
  @inject(Config) private readonly config: Config
  @inject(BaseLogger) private readonly DBLogger = new BaseLogger(
    'DBLogger'
  ).init()
  public connect = async (): Promise<Connection> => {
    const configORM: PostgresConnectionOptions = {
      type: this.config.typeorm_connection as 'postgres',
      host: this.config.typeorm_host,
      port: this.config.typeorm_port,
      username: this.config.typeorm_user,
      password: this.config.typeorm_password,
      database: this.config.typeorm_database,
      entities: [User],
      migrationsRun: this.config.typeorm_synchronize,
      synchronize: this.config.typeorm_synchronize,
      logging: this.config.typeorm_logging,
      logger: this.config.typeorm_logger as 'file',
      migrations: [this.config.typeorm_migrations],
      cli: {
        migrationsDir: this.config.typeorm_migrations_dir,
        entitiesDir: this.config.typeorm_entities_dir,
      },
    }
    try {
      const db = await createConnection(configORM)
      this.DBLogger.info(`Postgres database connected`)
      return db
    } catch (error) {
      throw new Error(error)
    }
  }
}

export const connectionAdapter = new ConnectionAdapter().connect()
