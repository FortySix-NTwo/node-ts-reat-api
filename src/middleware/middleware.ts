import express, { Application } from 'express'
import compression from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

const RateLimit = (server: Application) => {
  const limit = rateLimit({
    max: 100,
    windowMs: 30 * 60 * 1000,
    message: `Request Limit per has been reached`,
  })
  server.use(limit)
}

const JSONParsing = (server: Application) => {
  server.use(express.json({ limit: '10kb' }))
}

const BodyParsing = (server: Application) => {
  server.use(express.urlencoded({ extended: true }))
  server.use(express.json())
}

const HTTPHeaders = (server: Application) => server.use(helmet())

const Cors = (server: Application) =>
  server.use(cors({ credentials: true, origin: true }))

const Compression = (server: Application) => {
  server.use(compression())
}

export default [
  RateLimit,
  JSONParsing,
  BodyParsing,
  HTTPHeaders,
  Cors,
  Compression,
]
