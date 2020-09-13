import { AuthRequest } from '../types'
import { AuthHandler } from '../router'
import { isNullOrWhitespace } from '../utils/'
import { HTTPErrors } from '../adapters'
import { Request, Response, NextFunction } from 'express'
import { Validator } from 'class-validator'
import { Router, AsyncRouter } from 'express-async-router'

export abstract class BaseController {
  private readonly authHandler: AuthHandler

  public path: string
  public readonly router: Router

  public abstract initializeRoutes(): void

  constructor(path: string, addAuth: boolean = true) {
    if (isNullOrWhitespace(path)) {
      throw new HTTPErrors(`Parameter 'path' can not be empty.`, 400)
    }
    this.router = AsyncRouter()
    this.path = path

    if (addAuth) {
      this.router
        .all(this.path, this.authenticate)
        .all(`${this.path}/*`, this.authenticate)
    }
  }

  protected getBoolFromQueryParams(
    request: Request,
    queryParam: string
  ): boolean {
    const paramValue = request.query[queryParam] || 'false'
    const value =
      new Validator().validateOrReject(paramValue) &&
      (paramValue === 'true' || paramValue === '1')
    return value
  }

  private authenticate() {
    return (request: AuthRequest, response: Response, next: NextFunction) => {
      this.authHandler.handle(request, response, next)
    }
  }
}
