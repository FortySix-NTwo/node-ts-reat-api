import { Application } from 'express'
import { Router } from 'express-async-router'
import 'express-async-errors'

import {
  configServerMiddleware,
  configRouterMiddleware,
  configDB,
  appLogger,
  config,
} from './index'

const { port, host, environment } = config

export const configApp = async (server: Application, router: Router) => {
  try {
    process.on('uncaughtException', (error) => {
      appLogger.error({
        message: `uncaught Exception`,
        extra: error,
      })
      process.exit(1)
    })
    process.on('unhandledRejection', (error) => {
      appLogger.error({
        message: `unhandled Rejection`,
        extra: error,
      })
      process.exit(1)
    })
    await configDB()
    await configServerMiddleware(server)
    await configRouterMiddleware(router)
    server.use(router)
    server.listen(port, host, () => {
      appLogger.info(`Server Running at http://${host}:${port}`)
    })

    return server
  } catch (error) {
    if (environment === 'development') {
      appLogger.error(`Internal Server Error ${error.stack}`)
      process.exit(1)
    }
    appLogger.error(`Internal Server Error ${error}`)
    process.exit(1)
  }
}
