import { Router } from 'express'

import { Wrapper } from '../types'

const registerMiddleware = (middlewareWrappers: Wrapper[], router: Router) => {
  for (const wrapper of middlewareWrappers) {
    wrapper(router)
  }
}

export default registerMiddleware
