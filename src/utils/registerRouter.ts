import { Router } from 'express-async-router'

import { RouterMiddlewareWrapper } from '../types'

const registerRouter = (
  wrappers: RouterMiddlewareWrapper[],
  router: Router
) => {
  for (const wrapper of wrappers) {
    wrapper(router)
  }
}

export default registerRouter
