import { Request, Response, NextFunction } from 'express'

import { HTTPErrors } from '../adapters'
import { CacheControl } from '../types'
import { registerHeaders } from '../utils'

const healthRouter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    if (!req) {
      throw new HTTPErrors('Unauthorized', 400)
    }
    const { statusCode, statusMessage } = res
    return res
      .status(200)
      .json({
        request: await registerHeaders(req, CacheControl.ONLY_IF_CACHED),
        status: statusCode,
        message: statusMessage,
        data: 'O.K',
      })
      .end()
  } catch (error) {
    next(error)
  }
}

export default healthRouter
