import { AsyncRouter } from 'express-async-router'
import { createConnection } from 'typeorm'

import { configCache, configORM, configLogger } from './index'
import { registerMiddleware } from '../utils'
import { HandleError, middleware } from '../middleware'

const router = AsyncRouter()

export const configServer = async () => {
  try {
    process.on('uncaughtException', (e) => {
      configLogger.error({
        message: `uncaughtException`,
        extra: e,
      })
      process.exit(1)
    })
    await configCache()
    await createConnection(configORM)
    registerMiddleware(middleware, router)
    registerMiddleware(HandleError, router)
  } catch (error) {
    console.error(error)
  }
}
