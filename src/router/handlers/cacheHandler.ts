import { Request, Response, NextFunction } from 'express'
import { injectable, inject } from 'inversify'

import { HTTP400Error, CacheAdapter } from '../../adapters'

@injectable()
export class CacheHandler {
  @inject(CacheAdapter) private readonly cache = new CacheAdapter().init()
  handleCaching = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const key: string = req.params.key || req.body.key || req.query.key
      if (!key) {
        throw new HTTP400Error('Empty search')
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
