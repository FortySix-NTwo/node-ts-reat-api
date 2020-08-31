import { Router } from 'express-async-router'
import { Request, Response } from 'express'

import { registerRoutes } from '../utils'
// import { cachedRoutes, handleAuthorization } from '../middleware'

export const configRoutes = async (router: Router) => {
  try {
    registerRoutes(
      [
        {
          path: '',
          method: '',
          handler: [
            async (_req: Request, res: Response) => {
              res.status(200).send()
            },
          ],
        },
      ],
      router
    )
  } catch (error) {
    throw new Error(error)
  }
}
