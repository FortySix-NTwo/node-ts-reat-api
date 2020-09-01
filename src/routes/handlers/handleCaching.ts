import { Request, Response, NextFunction } from 'express'

import { asyncClient } from '../../config'
import { HTTP400Error } from '../../utils'

const handleCaching = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const key = req.params.key || req.body.key || req.query.key
    if (!key) {
      next(new HTTP400Error())
    }
    const result = asyncClient.get(key)
    if (!result) {
      next()
    }
    res.status(200).send(result)
  } catch (error) {
    next(new Error(error))
  }
}

export default [handleCaching]
