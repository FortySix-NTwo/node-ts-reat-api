import Redis from 'ioredis'
import { injectable, inject } from 'inversify'

import { Config } from '../config'
import { AppLogger } from './index'

@injectable()
export class CacheAdapter {
  private readonly cacheLogger = new AppLogger().init()
  @inject(Config) private readonly config: Config
  public init = (): Redis.Redis => {
    const client = new Redis(this.config.redis_url)
    this.cacheLogger.info(`Redis-Cache connected`)
    return client
  }
}

export const cacheClient = new CacheAdapter().init()
