import Redis from 'ioredis'

import { config, appLogger } from './index'

const configCache = (): Redis.Redis => {
  const { redis_url } = config
  const client = new Redis(redis_url)
  appLogger.info(`Redis-Cache connected`)
  return client
}

export const redisClient = configCache()
