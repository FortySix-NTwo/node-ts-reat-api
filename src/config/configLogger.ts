import winston from 'winston'
import Sentry from 'winston-transport-sentry-node'
import * as SentryNode from '@sentry/node'

import { config } from './index'
//TODO: change to Factory pattern (i.e abstract builder)

const logger = (): winston.Logger => {
  const { sentry_dsn } = config
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
