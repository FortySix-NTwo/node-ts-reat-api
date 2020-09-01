import { Request, Response, NextFunction, Application } from 'express'
import { Router } from 'express-async-router'

export type RouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void

export type RouteWrapper = {
  path: string
  method: string
  handler: RouteHandler | RouteHandler[]
}

export type ServerMiddlewareWrapper = (server: Application) => void

export type RouterMiddlewareWrapper = (router: Router) => void

export type ErrorWithCode = Error & { code?: string }

export type Query<T> = { [key in keyof T]?: T[key] }
