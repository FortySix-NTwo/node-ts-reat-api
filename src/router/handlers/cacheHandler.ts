import { Request, Response, NextFunction } from 'express'

import { HTTPErrors, CacheAdapter } from '../../adapters'

export class CacheHandler {
  private readonly cache = new CacheAdapter().init()
  handleCaching = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const key: string = req.params.key || req.body.key || req.query.key
      if (!key) {
        throw new HTTPErrors('Bad Request', 400)
      }
      const result = this.cache.get(key)
      if (!result) {
        next()
      }
      res.status(200).send(result)
    } catch (error) {
      throw new Error(error)
    }
  }
}
