import { Router } from 'express-async-router'
import { Request, Response, NextFunction } from 'express'

import {
  ErrorHandler,
  HTTP401Error,
  HTTP403Error,
  HTTP400Error,
  HTTP404Error,
} from '../utils'

import { ErrorWithCode } from '../types'

const NotFoundError = (router: Router) => {
  router.use((_req: Request, _res: Response) => {
    ErrorHandler.notFoundError()
  })
}

const ClientError = (router: Router) => {
  router.use(
    (err: ErrorWithCode, _req: Request, res: Response, next: NextFunction) => {
      if (err.code === 'Unauthorized') {
        err = new HTTP401Error()
      } else if (err.code === 'Forbidden') {
        err = new HTTP403Error()
      } else if (err.code === 'bad') {
        err = new HTTP400Error()
      } else {
        err = new HTTP404Error()
      }
      ErrorHandler.clientError(err, res, next)
    }
  )
}

const ServerError = (router: Router) => {
  router.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    ErrorHandler.serverError(err, res, next)
  })
}

export default [NotFoundError, ClientError, ServerError]
