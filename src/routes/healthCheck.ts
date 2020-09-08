import { Request, Response, NextFunction } from 'express'

import { registerHeaders, HTTP400Error, CacheControl } from '../utils'

const healthCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    if (!req) {
      throw new HTTP400Error()
    }
    const { statusCode, statusMessage } = res
    return res
      .status(200)
      .json({
        request: await registerHeaders(req, CacheControl.NO_CACHE),
        status: statusCode,
        message: statusMessage,
        data: 'O.K',
      })
      .end()
  } catch (error) {
    next(error)
  }
}

export default healthCheck
