import asyncRedis from 'async-redis'

import { config } from './index'

export const redisClient = asyncRedis.createClient({
  url: config.redis_url,
})

const configCache = async () => {
  redisClient.on('error', function (error: Error) {
    console.log('Error ' + error)
  })
}

export default configCache
