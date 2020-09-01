import { Application } from 'express'
import * as Sentry from '@sentry/node'

import { config, configDB, configRedis } from './index'

import { registerServerMiddleware } from '../utils'
import { middleware } from '../middleware'

const { sentry_dsn, environment } = config

export const configMiddleware = async (server: Application) => {
  try {
    await configDB()
    registerServerMiddleware(middleware, server)
    registerServerMiddleware(configRedis, server)
    Sentry.init({ dsn: sentry_dsn })
  } catch (error) {
    if (environment === 'development') {
      Sentry.captureException(error)
    }
    throw new Error(error)
  }
}
