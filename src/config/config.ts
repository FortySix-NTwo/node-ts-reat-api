import * as dotenv from 'dotenv'
import { injectable } from 'inversify'
import { isNullOrWhitespace } from '../utils'

@injectable()
export class Config {
  public readonly sourcePath: string = './src'
  public readonly apiPath: string = '/api'

  private _APPLICATION_PORT: number
  public get app_port(): number {
    return this._APPLICATION_PORT
  }

  private _APPLICATION_HOST: string
  public get app_host(): string {
    return this._APPLICATION_HOST
  }

  private _JWT_EXP: number
  public get jwt_exp(): number {
    return this._JWT_EXP
  }

  private _JWT_SECRET: string
  public get jwt_secret(): string {
    return this._JWT_SECRET
  }

  private _LOGGER_EXCEPTIONS: boolean
  public get logger_exceptions(): boolean {
    return this._LOGGER_EXCEPTIONS
  }

  private _NODE_ENVIRONMENT: string
  public get node_environment(): string {
    return this._NODE_ENVIRONMENT
  }

  private _REDIS_URL: string
  public get redis_url(): string {
    return this._REDIS_URL
  }

  private _SENTRY_DSN: string
  public get sentry_dsn(): string {
    return this._SENTRY_DSN
  }

  private _TYPEORM_CONNECTION: string
  public get typeorm_connection(): string {
    return this._TYPEORM_CONNECTION
  }

  private _TYPEORM_DATABASE: string
  public get typeorm_database(): string {
    return this._TYPEORM_DATABASE
  }

  private _TYPEORM_ENTITIES_DIR: string
  public get typeorm_entities_dir(): string {
    return this._TYPEORM_ENTITIES_DIR
  }

  private _TYPEORM_HOST: string
  public get typeorm_host(): string {
    return this._TYPEORM_HOST
  }

  private _TYPEORM_LOGGER: string
  public get typeorm_logger(): string {
    return this._TYPEORM_LOGGER
  }

  private _TYPEORM_LOGGING: boolean
  public get typeorm_logging(): boolean {
    return this._TYPEORM_LOGGING
  }

  private _TYPEORM_MIGRATIONS: string
  public get typeorm_migrations(): string {
    return this._TYPEORM_MIGRATIONS
  }

  private _TYPEORM_MIGRATIONS_DIR: string
  public get typeorm_migrations_dir(): string {
    return this._TYPEORM_MIGRATIONS_DIR
  }

  private _TYPEORM_PASSWORD: string
  public get typeorm_password(): string {
    return this._TYPEORM_PASSWORD
  }

  private _TYPEORM_PORT: number
  public get typeorm_port(): number {
    return this._TYPEORM_PORT
  }

  private _TYPEORM_SYNCHRONIZE: boolean
  public get typeorm_synchronize(): boolean {
    return this._TYPEORM_SYNCHRONIZE
  }

  private _TYPEORM_USERNAME: string
  public get typeorm_user(): string {
    return this._TYPEORM_USERNAME
  }

  private _WEB_SOCKET_PORT: number
  public get ws_port(): number {
    return this._WEB_SOCKET_PORT
  }

  private _WEB_SOCKET_ENDPOINT: string
  public get ws_endpoint(): string {
    return this._WEB_SOCKET_ENDPOINT
  }

  public setApplicationHost(host: string) {
    if (!isNullOrWhitespace(this._APPLICATION_HOST)) {
      throw new Error(
        `Host name has been set prior to: '${this._APPLICATION_HOST}'`
      )
    }
    this._APPLICATION_HOST = host === '::' ? 'localhost' : host
  }

  public initialize() {
    dotenv.config()
    let path
    switch (process.env.NODE_ENVIRONMENT) {
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
    const variables = {
      app_host: String(process.env.APPLICATION_HOST),
      app_port: Number(process.env.APPLICATION_PORT),
      jwt_exp: Number(process.env.JWT_EXP),
      jwt_secret: String(process.env.JWT_SECRET),
      logger_exceptions: Boolean(process.env.LOGGER_EXCEPTIONS),
      node_environment: String(process.env.NODE_ENVIRONMENT),
      redis_url: String(process.env.REDIS_URL),
      sentry_dsn: String(process.env.SENTRY_DSN),
      typeorm_connection: String(process.env.TYPEORM_CONNECTION),
      typeorm_database: String(process.env.TYPEORM_DATABASE),
      typeorm_entities_dir: String(process.env.TYPEORM_ENTITIES_DIR),
      typeorm_host: String(process.env.TYPEORM_HOST),
      typeorm_logger: String(process.env.TYPEORM_LOGGER),
      typeorm_logging: Boolean(process.env.TYPEORM_LOGGING),
      typeorm_migrations: String(process.env.TYPEORM_MIGRATIONS),
      typeorm_migrations_dir: String(process.env.TYPEORM_MIGRATIONS_DIR),
      typeorm_password: String(process.env.TYPEORM_PASSWORD),
      typeorm_synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE),
      typeorm_user: String(process.env.TYPEORM_USERNAME),
      typeorm_port: Number(process.env.TYPEORM_PORT),
      ws_endpoint: String(process.env.WEB_SOCKET_ENDPOINT),
      ws_port: Number(process.env.WEB_SOCKET_PORT),
    }
    this._APPLICATION_HOST = variables.app_host
    this._APPLICATION_PORT = variables.app_port
    this._JWT_EXP = variables.jwt_exp
    this._JWT_SECRET = variables.jwt_secret
    this._LOGGER_EXCEPTIONS = variables.logger_exceptions
    this._NODE_ENVIRONMENT = variables.node_environment
    this._REDIS_URL = variables.redis_url
    this._SENTRY_DSN = variables.sentry_dsn
    this._TYPEORM_CONNECTION = variables.typeorm_connection
    this._TYPEORM_DATABASE = variables.typeorm_database
    this._TYPEORM_ENTITIES_DIR = variables.typeorm_entities_dir
    this._TYPEORM_HOST = variables.typeorm_host
    this._TYPEORM_LOGGER = variables.typeorm_logger
    this._TYPEORM_LOGGING = variables.typeorm_logging
    this._TYPEORM_MIGRATIONS = variables.typeorm_migrations
    this._TYPEORM_MIGRATIONS_DIR = variables.typeorm_migrations_dir
    this._TYPEORM_PASSWORD = variables.typeorm_password
    this._TYPEORM_PORT = variables.typeorm_port
    this._TYPEORM_SYNCHRONIZE = variables.typeorm_synchronize
    this._TYPEORM_USERNAME = variables.typeorm_user
    this._WEB_SOCKET_ENDPOINT = variables.ws_endpoint
    this._WEB_SOCKET_PORT = variables.ws_port
  }
}
