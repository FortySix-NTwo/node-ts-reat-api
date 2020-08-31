import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

import { config } from '../config'
import { HTTP401Error } from '../utils'

const secret = config.jwt

const handleAuthorization = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'] as string

  if (!authHeader) {
    throw new HTTP401Error()
  }

  const token = authHeader.split(' ')[1]

  try {
    jwt.verify(token, secret)
    next()
  } catch (error) {
    throw new HTTP401Error()
  }
}

export default [handleAuthorization]
