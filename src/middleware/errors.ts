import { Router } from 'express-async-router'
import { Request, Response, NextFunction } from 'express'

import { errorWrapper } from '../utils'
import { ErrorWithCode, STATUS_CODE } from '../types'

const httpErrors = async (router: Router) => {
  router.use(
    (err: ErrorWithCode, req: Request, res: Response, next: NextFunction) => {
      try {
        const errorHandler = () => {
          return {
            code: err.code,
            message: err.message,
            stack: err.stack,
          }
        }
        const result = (status: STATUS_CODE) => {
          return {
            status: status,
            path: req.path,
            message: errorWrapper(err),
            data: errorHandler(),
          }
        }
        switch (err.code) {
          case 400:
            res.send(400).json(result(STATUS_CODE._400))
            break
          case 401:
            res.send(401).json(result(STATUS_CODE._401))
            break
          case 403:
            res.send(403).json(result(STATUS_CODE._403))
            break
          case 404:
            res.send(404).json(result(STATUS_CODE._404))
            break
          case 500:
            res.send(500).json(result(STATUS_CODE._500))
            break
          case 501:
            res.send(501).json(result(STATUS_CODE._501))
            break
        }
      } catch (error) {
        next(error)
      }
    }
  )
}

export default [httpErrors]
