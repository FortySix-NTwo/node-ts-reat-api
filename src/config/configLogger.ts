import winston from 'winston'
import Sentry from 'winston-transport-sentry-node'

import { config } from '.'

const { sentry_dsn } = config

export const configLogger = () => {
  const appLogger = winston.createLogger({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
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
  return appLogger
}
