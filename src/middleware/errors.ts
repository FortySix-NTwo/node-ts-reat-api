import { Router } from 'express-async-router'
import { Request, Response, NextFunction } from 'express'

import {
  HTTP400Error,
  HTTP401Error,
  HTTP403Error,
  HTTP404Error,
  notFoundError,
  serverError,
  httpErrorAdapter,
} from '../adapters'

import { ErrorWithCode } from '../types'
import { HTTP500Error } from '../adapters/errors/httpError'

const errors = (router: Router) => {
  router.use(
    (err: ErrorWithCode, _req: Request, res: Response, next: NextFunction) => {
      switch (err.code) {
        case 'Bad Request':
          err = new HTTP400Error()
          break
        case 'Unauthorized':
          err = new HTTP401Error()
          break
        case 'Forbidden':
          err = new HTTP403Error()
          break
        case 'Not Found':
          err = new HTTP404Error()
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
  router.use(
    (
      _err: HTTP500Error,
      _req: Request,
      _res: Response,
      _next: NextFunction
    ) => {
      serverError()
    }
  )
}

export default [errors, NotFoundError, ServerError]
