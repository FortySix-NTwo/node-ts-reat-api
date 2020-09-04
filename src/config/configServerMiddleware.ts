import { Application } from 'express'

import { registerServerMiddleware } from '../utils'
import { middleware } from '../middleware'

export const configServerMiddleware = async (server: Application) => {
  try {
    registerServerMiddleware(middleware, server)
    return server
  } catch (error) {
    throw new Error(error)
  }
}
