import { Application } from 'express'
import { Router } from 'express-async-router'

import { configServerMiddleware, configRouterMiddleware } from './index'

export const configApp = async (server: Application, router: Router) => {
  try {
    await configServerMiddleware(server)
    await configRouterMiddleware(router)
    server.use(router)
    return server
  } catch (error) {
    throw new Error(error)
  }
}
