import { NextFunction } from 'express-async-router'

import { AsyncFunction } from '../types'

export default (execution: AsyncFunction) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  execution(req, res, next).catch(next)
}
