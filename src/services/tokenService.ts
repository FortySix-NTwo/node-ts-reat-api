import { Logger } from '../adapters'
import { TokenProviderService } from './index'
import { User } from '../entity'
import { options } from '../config'
import { TokenInfo, TokenData } from '../types'
import { tokenWrapper } from '../wrappers'
import { HTTPErrors } from '../adapters'

export class TokenService {
  private readonly config = options
  private readonly tokenProvider: TokenProviderService
  private readonly logger = Logger('authLogger')
  private readonly jwt: tokenWrapper

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
        this.logger.warn(err.message)
      }
      throw new HTTPErrors('Unauthorized', 400)
    }
  }
}
