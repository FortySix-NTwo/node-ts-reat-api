import { Application } from 'express'
import * as Sentry from '@sentry/node'

import { config } from './index'

import { registerMiddleware } from '../utils'
import { middleware, errorHandler } from '../middleware'

const { sentry_dsn } = config

export const configMiddleware = async (server: Application) => {
  try {
    registerMiddleware(middleware, server)
    registerMiddleware(errorHandler, server)
    Sentry.init({ dsn: sentry_dsn })
  } catch (error) {
    Sentry.captureException(error)
    throw new Error(error)
  }
}
