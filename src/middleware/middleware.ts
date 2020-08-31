import express, { Router } from 'express'
import compression from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import swaggerUi from 'swagger-ui-express'
import winston from 'winston'
import expressWinston from 'express-winston'
import Sentry from 'winston-transport-sentry-node'

// import swaggerDocument from '../config/swagger.json';
import { config } from '../config'

const sentry_dsn = config.sentry_dsn

const RateLimit = (router: Router) => {
  const limit = rateLimit({
    max: 100,
    windowMs: 30 * 60 * 1000,
    message: `Request Limit per has been reached`,
  })
  router.use(limit)
}

const JSONParsing = (router: Router) => {
  router.use(express.json({ limit: '10kb' }))
}

const BodyParsing = (router: Router) => {
  router.use(express.urlencoded({ extended: true }))
  router.use(express.json())
}

const HTTPHeaders = (router: Router) => router.use(helmet())

const Cors = (router: Router) =>
  router.use(cors({ credentials: true, origin: true }))

const Compression = (router: Router) => {
  router.use(compression())
}

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

const SwaggerDocs = (router: Router) =>
  router.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(/* swaggerDocument */)
  )

export default [
  RateLimit,
  JSONParsing,
  BodyParsing,
  HTTPHeaders,
  Cors,
  Compression,
  SwaggerDocs,
  Logger,
]
