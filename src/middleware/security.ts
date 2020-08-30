import express, { Router } from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import cors from 'cors'

const handleRateLimit = (router: Router) => {
  const limit = rateLimit({
    max: 100,
    windowMs: 30 * 60 * 1000,
    message: `Request Limit per has been reached`,
  })
  router.use(limit)
}

const handleJSON = (router: Router) => {
  router.use(express.json({ limit: '10kb' }))
}

const handleHTTPHeaders = (router: Router) => router.use(helmet())

const handleCors = (router: Router) =>
  router.use(cors({ credentials: true, origin: true }))

export default {
  handleRateLimit,
  handleJSON,
  handleHTTPHeaders,
  handleCors,
}
