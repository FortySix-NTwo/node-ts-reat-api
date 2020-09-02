import { Application } from 'express'
import { Router } from 'express-async-router'

export type ServerMiddlewareWrapper = (server: Application) => void

export type RouterMiddlewareWrapper = (router: Router) => void

export type ErrorWithCode = Error & { code?: string }

export type Query<T> = { [key in keyof T]?: T[key] }
