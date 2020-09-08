import express, { Router } from 'express'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

const RateLimit = (router: Router) => {
  const limit = rateLimit({
    max: 50,
    windowMs: 60 * 60 * 1000,
    message: 'Request Limited',
  })
  router.use(limit)
}

const cookieParsing = (router: Router) => {
  router.use(cookieParser())
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

export default [
  RateLimit,
  JSONParsing,
  BodyParsing,
  cookieParsing,
  HTTPHeaders,
  Cors,
  Compression,
]
