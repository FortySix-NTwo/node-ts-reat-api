import { Router } from 'express-async-router'
import { Request, Response, NextFunction } from 'express'

import {
  HTTP401Error,
  HTTP403Error,
  HTTP400Error,
  HTTP404Error,
  notFoundError,
  clientError,
  serverError,
} from '../utils'

import { ErrorWithCode } from '../types'

const ClientError = (router: Router) => {
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
      clientError(err, res, next)
    }
  )
}

const NotFoundError = (router: Router) => {
  router.use((_req: Request, _res: Response) => {
    notFoundError()
  })
}

const ServerError = (router: Router) => {
  router.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    serverError(err, res, next)
  })
}

export default [NotFoundError, ClientError, ServerError]
