import asyncRedis from 'async-redis'
import redis from 'redis'

import { config } from './index'
const { redis_url } = config

const client = redis.createClient({
  url: redis_url,
})

client.on('error', (error: Error) => {
  if (error) {
    throw new Error(`error : ${error}`)
  }
})

export const asyncClient = asyncRedis.decorate(client)
