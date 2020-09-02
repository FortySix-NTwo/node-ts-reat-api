import winston from 'winston'
import Sentry from 'winston-transport-sentry-node'
import * as SentryNode from '@sentry/node'

import { config } from './index'

const { sentry_dsn } = config

const logger = (): winston.Logger => {
  SentryNode.init({
    dsn: sentry_dsn,
  })
  const logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.prettyPrint(),
      winston.format.simple(),
      winston.format.label()
    ),
    transports: [
      new winston.transports.Console({ handleExceptions: true }),
      new Sentry({
        sentry: {
          dsn: sentry_dsn,
        },
        handleExceptions: true,
      }),
    ],
  })
  return logger
}

export const appLogger = logger()
