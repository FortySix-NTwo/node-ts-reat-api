import { Router, NextFunction, Request, Response, Application } from 'express'

export type ServerMiddlewareWrapper = (application: Application) => any

export type RouterMiddlewareWrapper = (router: Router) => void

export type ErrorWithCode = Error & { code?: string }

export type Query<T> = { [key in keyof T]?: T[key] }

export type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>
