import { Router } from 'express'

import { registerRouter, asyncFunction } from '../utils'
import { routingErrors, swaggerDocs } from '../middleware'
import { healthCheck, userRouter } from '../routes'

//TODO: change to Factory pattern (i.e builder)

export const configRouter = async (router: Router) => {
  try {
    router.get('/api/v1/', asyncFunction(healthCheck))
    router.post('/api/v1/user/', asyncFunction(userRouter))
    router.post('/api/v1/auth/')
    registerRouter(swaggerDocs, router)
    registerRouter(routingErrors, router)
    return router
  } catch (error) {
    throw new Error(error)
  }
}
