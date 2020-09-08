import { Request, Response, NextFunction } from 'express'

import { registerHeaders, HTTP400Error } from '../utils'

const healthCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    if (!req) {
      throw new HTTP400Error()
    }
    const headers = await registerHeaders(req)
    return res
      .status(200)
      .json({
        headers,
        message: 'O.K',
      })
      .end()
  } catch (error) {
    next(error)
  }
}

export default healthCheck
