import { Response, NextFunction } from 'express'

import { redisClient } from '../config'

const getFromCache = async (key: string, res: Response, next: NextFunction) => {
  let data = await redisClient.get(key)

  if (data) {
    res.status(200).send(data)
  } else {
    next()
  }
}

export default getFromCache
