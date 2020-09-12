import { Response, NextFunction } from 'express'
import { injectable, inject } from 'inversify'

import { Config } from '../../config'
import { HTTP404Error, HTTP500Error } from './index'

@injectable()
export class HTTPError extends Error {
  @inject(Config) private readonly config: Config
  public status: number
  public message: any
  constructor(message: object | string, status: number) {
    if (message instanceof Object) {
      super(`HTTP ${status} status: ${JSON.stringify(message)}`)
    } else {
      super(`HTTP ${status} status: ${message}`)
    }
    if (this.config.node_environment === 'development') {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export const notFoundError = () => {
  throw new HTTP404Error('Method Not found')
}

export const serverError = () => {
  throw new HTTP500Error('Internal Server Error')
}

export const httpErrorAdapter = (
  err: Error,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof HTTPError) {
    console.log(err)
    res.status(err.status).send(err.message)
  } else {
    next(err)
  }
}
