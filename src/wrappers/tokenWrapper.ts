import { injectable } from 'inversify'
import * as jwt from 'jsonwebtoken'

import { Secret, SignOptions, VerifyOptions } from '../types'

@injectable()
class TokenWrapper {
  public async sign(
    payload: string | Buffer | object,
    secretOrPrivateKey: Secret,
    signOptions?: SignOptions | undefined
  ): Promise<string | undefined> {
    if (signOptions) {
      return jwt.sign(payload, secretOrPrivateKey, signOptions)
    }
    return jwt.sign(payload, secretOrPrivateKey)
  }

  public verify(
    token: string,
    secretOrPublicKey: Secret,
    verifyOptions?: VerifyOptions | undefined
  ): object | string {
    return jwt.verify(token, secretOrPublicKey, verifyOptions)
  }
}

export default TokenWrapper
