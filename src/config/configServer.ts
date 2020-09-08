import http from 'http'
import { Application } from 'express'

import { appLogger, config } from './index'
import { registerMiddleware } from '../utils'
import { middleware } from '../middleware'

const { port, host, environment } = config

export const configServer = async (application: Application) => {
  try {
    registerMiddleware(middleware, application)
    const server = http.createServer(application)
    server.listen(port, host, () => {
      appLogger.info(`Server Running at http://${host}:${port}`)
    })
    return server
  } catch (error) {
    if (environment === 'development') {
      throw new Error(error.stack)
    }
    throw new Error(error)
  }
}
