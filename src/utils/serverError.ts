import { Response, NextFunction } from 'express'

export const serverError = (err: Error, res: Response, _next: NextFunction) => {
  if (process.env.NODE_ENV === 'development') {
    res.status(500).send(err.stack)
  }
  res.status(500).send('Internal Server Error')
}
