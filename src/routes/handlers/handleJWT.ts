import jwt from 'jsonwebtoken'
import { Request, NextFunction } from 'express'

import { config } from '../../config'
import { HTTP401Error } from '../../utils'

const { jwt_secret } = config

const handleAuthorization = (req: Request, next: NextFunction) => {
  const authHeader = req.headers['authorization'] as string

  if (!authHeader) {
    throw new HTTP401Error()
  }

  const token = authHeader.split(' ')[1]

  try {
    jwt.verify(token, jwt_secret)
    next()
  } catch (error) {
    throw new HTTP401Error()
  }
}

export default [handleAuthorization]
