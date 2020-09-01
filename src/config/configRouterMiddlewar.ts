import { Router } from 'express-async-router'
import * as Sentry from '@sentry/node'

import { config } from './index'
import { registerRouterMiddleware } from '../utils'
const { sentry_dsn, environment } = config
import { routingErrors, swaggerDocs } from '../middleware'

export const configMiddleware = async (router: Router) => {
  try {
    registerRouterMiddleware(swaggerDocs, router)
    registerRouterMiddleware(routingErrors, router)
    Sentry.init({ dsn: sentry_dsn })
  } catch (error) {
    if (environment === 'development') {
      Sentry.captureException(error)
    }
    throw new Error(error)
  }
}
