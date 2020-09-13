import { Router } from 'express-async-router'

import { RouterWrapper } from '../types'

const registerRouter = (wrappers: RouterWrapper[], router: Router) => {
  for (const wrapper of wrappers) {
    wrapper(router)
  }
  return router
}

export default registerRouter
