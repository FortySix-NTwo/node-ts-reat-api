import { Request } from 'express'
import { CacheControl } from './verbs'

export const registerHeaders = async (req: Request, cache: CacheControl) => {
  const { path, method, headers, ip } = req
  const request = {
    path,
    method,
    ip,
    headers,
    allowedMethods: [
      'Access-Control-Allow-Methods',
      `GET, POST, PATCH, DELETE`,
    ],
    cors: ['Access-Control-Allow-Methods', '*'],
    contentType: ['Access-Control-Allow-Headers', 'application/json'],
    caching: ['Cache-Control', `${cache}`],
  }
  return request
}
