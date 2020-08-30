import { Router, Request, Response, NextFunction } from 'express'

export type handler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void

export type Route = {
  path: string
  method: string
  handler: handler | handler[]
}

export type Wrapper = (router: Router) => void
