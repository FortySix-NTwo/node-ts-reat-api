import express, { Router } from 'express'
import compression from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import swaggerUi from 'swagger-ui-express'
// import swaggerDocument from '../config/swagger.json';

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
]
