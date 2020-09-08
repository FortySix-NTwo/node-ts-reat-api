import { Router } from 'express-async-router'

import { registerRouter, asyncFunction } from '../utils'
import { routingErrors, swaggerDocs } from '../middleware'
import { healthCheck } from '../routes'

export const configRouter = async (router: Router) => {
  try {
    router.use('/', asyncFunction)
    router.get('/api', asyncFunction(healthCheck))
    registerRouter(swaggerDocs, router)
    registerRouter(routingErrors, router)
    return router
  } catch (error) {
    throw new Error(error)
  }
}
