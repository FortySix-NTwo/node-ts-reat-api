import { Router } from 'express'

import { registerRouter, asyncFunction } from '../wrappers/'
import { routingErrors, swaggerDocs } from '../middleware'
import { healthRouter, userRouter } from '../router'

export const routerAdapter = async (router: Router) => {
  try {
    router.get('/api/v1/', asyncFunction(healthRouter))
    router.post('/api/v1/user', asyncFunction(userRouter))
    registerRouter(swaggerDocs, router)
    registerRouter(routingErrors, router)
    return router
  } catch (error) {
    throw new Error(error)
  }
}
