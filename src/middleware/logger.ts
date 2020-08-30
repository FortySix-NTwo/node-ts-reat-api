import { Router } from 'express'
import winston from 'winston'
import expressWinston from 'express-winston'
import Sentry from 'winston-transport-sentry-node'

import { config } from '../config'

const sentry_dsn = config.sentry_dsn

const Logger = (router: Router) =>
  router.use(
    expressWinston.logger({
      msg: 'HTTP {{req.method}} {{req.url}}',
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
  )

export default Logger
