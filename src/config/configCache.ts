import asyncRedis from 'async-redis'

import { config } from './index'

const { redis_url } = config

export const redisClient = asyncRedis.createClient({
  url: redis_url,
})

const configCache = async () => {
  redisClient.on('error', function (error: Error) {
    console.log('Error ' + error)
  })
}

export default configCache
