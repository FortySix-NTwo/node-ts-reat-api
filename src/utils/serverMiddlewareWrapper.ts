import { Application } from 'express'

import { ServerMiddlewareWrapper } from '../types'

const registerServerMiddleware = (
  wrappers: ServerMiddlewareWrapper[],
  server: Application
) => {
  for (const wrapper of wrappers) {
    wrapper(server)
  }
}

export default registerServerMiddleware
