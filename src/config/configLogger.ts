import winston from 'winston'
import Sentry from 'winston-transport-sentry-node'

import { config } from '../config'

const sentry_dsn = config.sentry_dsn

const configLogger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.colorize(),
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

export default configLogger
