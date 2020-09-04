import Redis from 'ioredis'

import { config, appLogger } from './index'

const { redis_url } = config

const configCache = (): Redis.Redis => {
  const client = new Redis(redis_url)
  appLogger.info(`Redis-Cache connected`)
  return client
}

export const redisClient = configCache()
