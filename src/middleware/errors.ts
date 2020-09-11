import { Router } from 'express-async-router'
import { Request, Response, NextFunction } from 'express'

import {
  HTTPErrors,
  notFoundError,
  serverError,
  httpErrorAdapter,
} from '../adapters'

import { ErrorWithCode } from '../@types'

const errors = (router: Router) => {
  router.use(
    (err: ErrorWithCode, _req: Request, res: Response, next: NextFunction) => {
      switch (err.code) {
        case 'Bad Request':
          err = new HTTPErrors.HTTP400Error()
          break
        case 'Unauthorized':
          err = new HTTPErrors.HTTP401Error()
          break
        case 'Forbidden':
          err = new HTTPErrors.HTTP403Error()
          break
        case 'Not Found':
          err = new HTTPErrors.HTTP404Error()
          break
      }
      httpErrorAdapter(err, res, next)
    }
  )
}

const NotFoundError = (router: Router) => {
  router.use((_req: Request, _res: Response) => {
    notFoundError()
  })
}

const ServerError = (router: Router) => {
  router.use((_req: Request, _res: Response) => {
    serverError()
  })
}

export default [errors, NotFoundError, ServerError]
