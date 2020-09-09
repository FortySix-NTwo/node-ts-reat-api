import { Application } from 'express'

import { appLogger, config } from './index'
import { registerMiddleware } from '../utils'
import { middleware } from '../middleware'

//TODO: change to Factory pattern (i.e builder)
export const configApplication = async (application: Application) => {
  const { port, host, environment } = config
  try {
    registerMiddleware(middleware, application)
    application.listen(port, host, () => {
      appLogger.info(`Server Listening on http://${host}:${port}`)
    })
    return application
  } catch (error) {
    if (environment === 'development') {
      throw new Error(error.stack)
    }
    throw new Error(error)
  }
}
