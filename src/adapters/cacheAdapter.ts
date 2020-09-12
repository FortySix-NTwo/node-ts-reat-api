import IORedis from 'ioredis'
import { injectable, inject } from 'inversify'

import { Config } from '../config'
import { BaseLogger } from './index'

@injectable()
export class CacheAdapter {
  @inject(BaseLogger) private readonly cacheLogger = new BaseLogger(
    'cacheLogger'
  ).init()
  @inject(Config) private readonly config: Config
  public init = (): IORedis.Redis => {
    const client = new IORedis(this.config.redis_url)
    this.cacheLogger.info(`Redis-Cache connected`)
    return client
  }
}
