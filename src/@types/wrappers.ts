import { Router, NextFunction, Request, Response, Application } from 'express'

export type MiddlewareWrapper = (application: Application) => any

export type RouterWrapper = (router: Router) => void

export type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>
