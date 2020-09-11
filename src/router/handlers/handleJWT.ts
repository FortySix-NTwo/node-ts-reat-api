import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

import { config } from '../config'
import { HTTP401Error } from '../utils'

const { jwt_secret } = config

interface TokenPayload {
  id: string
  iat: number
  exp: number
}

const handleAuthorization = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers
  if (!authorization) {
    throw new HTTP401Error()
  }
  const token = authorization.replace('Bearer', '').trim()
  try {
    const data = jwt.verify(token, jwt_secret)
    const { id } = data as TokenPayload
    req.signedCookies = id
    return next()
  } catch {
    throw new HTTP401Error()
  }
}

export default handleAuthorization
