import { Application } from 'express'

import { ServerMiddlewareWrapper } from '../types'

const registerMiddleware = (
  wrappers: ServerMiddlewareWrapper[],
  server: Application
) => {
  for (const wrapper of wrappers) {
    wrapper(server)
  }
}

export default registerMiddleware
