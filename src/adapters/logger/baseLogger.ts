import winston from 'winston'
import Sentry from 'winston-transport-sentry-node'
import * as SentryNode from '@sentry/node'
import { injectable, inject } from 'inversify'

import { Config } from '../../config'

@injectable()
export abstract class BaseLogger {
  @inject(Config) private readonly config: Config

  public abstract type: string

  private sentry() {
    SentryNode.init({
      dsn: this.config.sentry_dsn,
    })
  }

  public init(): winston.Logger {
    this.sentry()
    const logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.prettyPrint(),
        winston.format.simple(),
        winston.format.label(),
        winston.format.colorize({
          colors: {
            info: 'green',
            error: 'red',
          },
        })
      ),
      transports: [
        new winston.transports.Console({ handleExceptions: true }),
        new Sentry({
          sentry: {
            dsn: this.config.sentry_dsn,
          },
          handleExceptions: this.config.logger_exceptions,
        }),
      ],
    })
    return logger
  }
}