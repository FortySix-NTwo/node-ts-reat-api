import express, { Application } from 'express'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

const RateLimit = (application: Application) => {
  const limit = rateLimit({
    max: 50,
    windowMs: 60 * 60 * 1000,
    message: 'Request Limited',
  })
  application.use(limit)
}

const cookieParsing = (application: Application) => {
  application.use(cookieParser())
}
const JSONParsing = (application: Application) => {
  application.use(express.json({ limit: '10kb' }))
}

const BodyParsing = (application: Application) => {
  application.use(express.urlencoded({ extended: true }))
  application.use(express.json())
}

const HTTPHeaders = (application: Application) => application.use(helmet())

const Cors = (application: Application) =>
  application.use(cors({ credentials: true, origin: true }))

const Compression = (application: Application) => {
  application.use(compression())
}

export default [
  RateLimit,
  JSONParsing,
  BodyParsing,
  cookieParsing,
  HTTPHeaders,
  Cors,
  Compression,
]
