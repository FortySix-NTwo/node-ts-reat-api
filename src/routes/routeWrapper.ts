import { Router } from 'express'

import { Route } from '../types/index'

const registerRoutes = (routes: Route[], router: Router) => {
  for (const route of routes) {
    const { method, path, handler } = route
    ;(router as any)[method](path, handler)
  }
}

export default registerRoutes
