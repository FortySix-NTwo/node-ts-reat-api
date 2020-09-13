import { Response, NextFunction } from 'express'
import { HTTPErrors } from '../../adapters'

import { TokenService } from '../../services'
import { AuthRequest } from '../../types'

export class AuthHandler {
  private readonly tokenService: TokenService

  public handle(req: AuthRequest, _res: Response, next: NextFunction): void {
    if (!req.cookies || !req.cookies.Authorization) {
      throw new HTTPErrors('Unauthorized', 401)
    }

    const tokenData = this.tokenService.verify(req.cookies.Authorization)
    if (!tokenData) {
      throw new HTTPErrors('Unauthorized', 401)
    }

    req.auth = tokenData
    next()
  }
}
