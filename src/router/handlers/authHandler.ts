import { Response, NextFunction } from 'express'
import { injectable, inject } from 'inversify'
import { HTTP401Error } from '../../adapters'

import { TokenService } from '../../services'
import { AuthRequest } from '../../types'

@injectable()
export class AuthHandler {
  @inject(TokenService) private readonly tokenService: TokenService

  public handle(req: AuthRequest, _res: Response, next: NextFunction): void {
    if (!req.cookies || !req.cookies.Authorization) {
      throw new HTTP401Error()
    }

    const tokenData = this.tokenService.verify(req.cookies.Authorization)
    if (!tokenData) {
      throw new HTTP401Error()
    }

    req.auth = tokenData
    next()
  }
}
