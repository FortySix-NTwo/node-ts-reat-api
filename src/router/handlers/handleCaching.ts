import { Request, Response, NextFunction } from 'express'

import { redisClient } from '../config'
import { HTTP400Error } from '../utils'

const handleCaching = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const key: string = req.params.key || req.body.key || req.query.key
    if (!key) {
      throw new HTTP400Error('Empty search')
    }
    const result = redisClient.get(key)
    if (!result) {
      next()
    }
    res.status(200).send(result)
  } catch (error) {
    throw new Error(error)
  }
}

export default handleCaching
