import { Request, Response, NextFunction } from 'express'

import { AsyncFunction } from '../types'

const asyncFunction = (execution: AsyncFunction) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  execution(req, res, next).catch(next)
}

export default asyncFunction
