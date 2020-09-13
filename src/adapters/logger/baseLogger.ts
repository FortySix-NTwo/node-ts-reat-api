import winston from 'winston'
import Sentry from 'winston-transport-sentry-node'
import * as SentryNode from '@sentry/node'

import { options } from '../../config'

class BaseLogger {
  private readonly config = options
  public label: string
  private sentry() {
    SentryNode.init({
      dsn: this.config.sentry_dsn,
    })
  }

  constructor(label: string) {
    this.label = label
  }

  public init(): winston.Logger {
    this.sentry()
    const logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.label({
          label: this.label,
          message: true,
        }),
        winston.format.timestamp({
          format: new Date().toLocaleDateString(),
        }),
        winston.format.colorize({
          colors: {
            info: 'green',
            warn: 'yellow',
            error: 'red',
            http: 'blue',
          },
        }),
        winston.format.cli()
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

export const Logger = (label: string) => new BaseLogger(label).init()
