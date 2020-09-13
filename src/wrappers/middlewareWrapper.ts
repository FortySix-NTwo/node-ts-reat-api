import { Application } from 'express'

import { MiddlewareWrapper } from '../types'

const registerMiddleware = (
  wrappers: MiddlewareWrapper[],
  server: Application
) => {
  for (const wrapper of wrappers) {
    wrapper(server)
  }
  return server
}

export default registerMiddleware
