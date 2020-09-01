import { Response, NextFunction } from 'express'

import { HTTP404Error } from './index'

export abstract class HTTPClientError extends Error {
  readonly statusCode!: number
  readonly name!: string

  constructor(message: object | string) {
    if (message instanceof Object) {
      super(JSON.stringify(message))
    } else {
      super(message)
    }
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

export const notFoundError = () => {
  throw new HTTP404Error('Method not found.')
}

export const clientError = (err: Error, res: Response, next: NextFunction) => {
  if (err instanceof HTTPClientError) {
    console.warn(err)
    res.status(err.statusCode).send(err.message)
  } else {
    next(err)
  }
}
