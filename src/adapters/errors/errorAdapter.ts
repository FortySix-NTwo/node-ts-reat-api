import { Response, NextFunction } from 'express'
import { injectable, inject } from 'inversify'

import { Config } from '../../config'
import { HTTPErrors } from './index'

@injectable()
export abstract class HTTPError extends Error {
  @inject(Config) private readonly config: Config
  readonly statusCode!: number
  readonly name!: string
  readonly environment: string
  public status: number

  constructor(message: object | string, status: number) {
    if (message instanceof Object) {
      super(`HTTP ${status} status: ${JSON.stringify(message)}`)
      this.status = status
    } else {
      super(`HTTP ${status} status: ${message}`)
      this.status = status
    }
    this.environment == this.config.node_environment
    this.name = this.constructor.name
    if (this.environment === 'development') {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export const notFoundError = () => {
  throw new HTTPErrors.HTTP404Error('Method Not found')
}

export const serverError = () => {
  throw new HTTPErrors.HTTP500Error('Internal Server Error')
}

export const httpErrorAdapter = (
  err: Error,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof HTTPError) {
    console.log(err)
    res.status(err.statusCode).send(err.message)
  } else {
    next(err)
  }
}
