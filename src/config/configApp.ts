import { Application } from 'express'
import { Router } from 'express-async-router'
import * as Sentry from '@sentry/node'

import { configServerMiddleware, configRouterMiddleware, config } from './index'
const { sentry_dsn, environment } = config

export const configApp = async (server: Application, router: Router) => {
  try {
    Sentry.init({ dsn: sentry_dsn })
    await configServerMiddleware(server)
    await configRouterMiddleware(router)
    server.use(router)
    return server
  } catch (error) {
    if (environment === 'development') {
      Sentry.captureException(error.stack)
    }
    throw new Error(error)
  }
}
