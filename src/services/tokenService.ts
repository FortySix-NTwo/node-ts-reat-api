import { injectable, inject } from 'inversify'

import { BaseLogger } from '../adapters'
import { TokenProviderService } from './index'
import { User } from '../entity'
import { Config } from '../config'
import { TokenInfo, TokenData } from '../types'
import { tokenWrapper } from '../wrappers'
import { HTTP400Error } from '../adapters'

@injectable()
export class TokenService {
  @inject(Config) private readonly config: Config
  @inject(TokenProviderService)
  private readonly tokenProvider: TokenProviderService
  @inject(BaseLogger) private readonly authLogger = new BaseLogger(
    'authLogger'
  ).init()
  @inject(tokenWrapper) private readonly jwt: tokenWrapper

  public create(user: User): TokenInfo {
    const tokenData: TokenData = {
      userId: user.email,
      name: user.username,
      email: user.email,
    }

    const options = {
      algorithm: 'RS256',
      expiresIn: this.config.jwt_exp * 1000,
    }

    const token = this.jwt.sign(
      tokenData,
      this.tokenProvider.privateKey,
      options
    )

    return {
      expiresIn: options.expiresIn as number,
      token: String(token),
    }
  }

  public verify(token: string): TokenData {
    try {
      const options = {
        algorithms: ['RS256'],
      }
      const tokenData = this.jwt.verify(
        token,
        this.tokenProvider.publicKey,
        options
      ) as TokenData
      return tokenData
    } catch (err) {
      if (err.name !== 'TokenExpiredError') {
        this.authLogger.warn(err.message)
      }
      throw new HTTP400Error()
    }
  }
}
