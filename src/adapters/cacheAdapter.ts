import IORedis from 'ioredis'

import { options } from '../config'
import { Logger } from './index'

export class CacheAdapter {
  private readonly logger = Logger('cacheLogger')
  private readonly config = options
  public init = (): IORedis.Redis => {
    const client = new IORedis(this.config.redis_url)
    this.logger.info(`Redis-Cache connected`)
    return client
  }
}
