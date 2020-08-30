import { Response, NextFunction } from 'express'

import { HTTPClientError, HTTP404Error } from './index'

const notFoundError = () => {
  throw new HTTP404Error('Method not found.')
}

const clientError = (err: Error, res: Response, next: NextFunction) => {
  if (err instanceof HTTPClientError) {
    console.warn(err)
    res.status(err.statusCode).send(err.message)
  } else {
    next(err)
  }
}

const serverError = (err: Error, res: Response, _next: NextFunction) => {
  console.error(err)
  if (process.env.NODE_ENV === 'production') {
    res.status(500).send('Internal Server Error')
  } else {
    res.status(500).send(err.stack)
  }
}

export default {
  notFoundError,
  clientError,
  serverError,
}
