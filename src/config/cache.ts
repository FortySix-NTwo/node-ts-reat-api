import asyncRedis from 'async-redis'

import { config } from 'config'

export const redisClient = asyncRedis.createClient({
  url: config.redis_url,
})

export const connectCache = async () => {
  redisClient.on('error', function (error: Error) {
    console.log('Error ' + error)
  })
}
