import { Router } from 'express'

import { RouteWrapper } from '../types'

export const registerRoutes = (routes: RouteWrapper[], router: Router) => {
  for (const route of routes) {
    const { method, path, handler } = route
    ;(router as any)[method](path, handler)
  }
}

export default registerRoutes
