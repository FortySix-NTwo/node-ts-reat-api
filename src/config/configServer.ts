import { AsyncRouter } from 'express-async-router'
import { createConnection } from 'typeorm'

import { configCache, configORM } from './index'
import { registerMiddleware } from '../utils'
import { HandleError, middleware } from '../middleware'

const router = AsyncRouter()

const configServer = async () => {
  await configCache()
  await createConnection(configORM)
  registerMiddleware(middleware, router)
  registerMiddleware(HandleError, router)
}

export { configServer }
