import { Application } from 'express'
import * as Sentry from '@sentry/node'

import { config } from './index'

import { registerServerMiddleware } from '../utils'
import { middleware } from '../middleware'

const { sentry_dsn, environment } = config

export const configServerMiddleware = async (server: Application) => {
  try {
    registerServerMiddleware(middleware, server)
    Sentry.init({ dsn: sentry_dsn })
  } catch (error) {
    if (environment === 'development') {
      Sentry.captureException(error)
    }
    throw new Error(error)
  }
}
