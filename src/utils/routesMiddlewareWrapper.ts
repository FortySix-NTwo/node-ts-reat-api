import { Router } from 'express-async-router'

import { RouterMiddlewareWrapper } from '../types'

const registerRouterMiddleware = (
  wrappers: RouterMiddlewareWrapper[],
  router: Router
) => {
  for (const wrapper of wrappers) {
    wrapper(router)
  }
}

export default registerRouterMiddleware
