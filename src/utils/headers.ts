import { Request } from 'express'
import { CacheControl } from './verbs'

export const registerHeaders = async (req: Request, cache: CacheControl) => {
  const { path, method, headers, hostname, ip } = req
  const contentType = 'application/json'
  const request = {
    path,
    method,
    hostname,
    ip,
    headers,
    allowedMethods: [
      'Access-Control-Allow-Methods',
      `GET, POST, PATCH, DELETE`,
    ],
    cors: ['Access-Control-Allow-Methods', '*'],
    contentType: ['Access-Control-Allow-Headers', `${contentType}`],
    caching: ['Cache-Control', `${cache}`],
  }

  return request
}
