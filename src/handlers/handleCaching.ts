import { Request, Response, NextFunction } from 'express'

import { asyncClient } from '../config'
import { HTTP400Error } from 'utils'
import { compareQuery } from '../entity'

const handleCaching = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.params || req.body || req.query
    const key = req.params.key || req.body.key || req.query.key
    if (!key) {
      throw new HTTP400Error()
    }
    const result = asyncClient.get(key)
    if (!result) {
      compareQuery(query, key)
    }
    res.status(200).send(result)
  } catch (error) {
    next()
  }
}

export default [handleCaching]
