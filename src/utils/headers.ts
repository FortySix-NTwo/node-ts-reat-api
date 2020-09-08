import { Request } from 'express'

export const registerHeaders = async (req: Request) => {
  const { path, method, headers, rawHeaders, hostname, ip } = req

  const cors = ['Access-Control-Allow-Origin', '*']
  const methods = ['Access-Control-Allow-Methods', `${method}`]
  const contentType = ['Access-Control-Allow-Headers', 'application/json']
  const cache = ['Cache-Control', 'non-cache']
  const header = {
    path,
    method,
    headers,
    rawHeaders,
    hostname,
    ip,
    methods,
    cors,
    contentType,
    cache,
  }

  return header
}
