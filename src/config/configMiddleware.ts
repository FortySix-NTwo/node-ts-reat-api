import { Application } from 'express'
import * as Sentry from '@sentry/node'

import { config } from './index'

import { registerMiddleware } from '../utils'
import { middleware } from '../middleware'

const { sentry_dsn, environment } = config

export const configMiddleware = async (server: Application) => {
  try {
    registerMiddleware(middleware, server)
    Sentry.init({ dsn: sentry_dsn })
  } catch (error) {
    if (environment === 'development') {
      Sentry.captureException(error)
    }
    throw new Error(error)
  }
}
