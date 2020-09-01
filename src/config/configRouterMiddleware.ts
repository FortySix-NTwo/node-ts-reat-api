import { Router } from 'express-async-router'

import { registerRouterMiddleware } from '../utils'
import { routingErrors, swaggerDocs } from '../middleware'
import { healthCheck } from '../routes'

export const configRouterMiddleware = async (router: Router) => {
  try {
    registerRouterMiddleware(healthCheck, router)
    registerRouterMiddleware(swaggerDocs, router)
    registerRouterMiddleware(routingErrors, router)
  } catch (error) {
    throw new Error(error)
  }
}
