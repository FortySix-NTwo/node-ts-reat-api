import { Router } from 'express-async-router'

import { registerRouterMiddleware } from '../utils'
import { routingErrors, swaggerDocs } from '../middleware'

export const configRouterMiddleware = async (router: Router) => {
  try {
    registerRouterMiddleware(swaggerDocs, router)
    registerRouterMiddleware(routingErrors, router)
    return router
  } catch (error) {
    throw new Error(error)
  }
}
