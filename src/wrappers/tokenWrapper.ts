import * as jwt from 'jsonwebtoken'

import { Secret, SignOptions, VerifyOptions } from '../types'

class TokenWrapper {
  public async sign(
    payload: string | Buffer | object,
    secretOrPrivateKey: Secret,
    signOptions?: SignOptions | undefined
  ): Promise<string | undefined> {
    if (signOptions) {
      const options = signOptions as Object
      return jwt.sign(payload, secretOrPrivateKey, options)
    }
    return jwt.sign(payload, secretOrPrivateKey)
  }

  public verify(
    token: string,
    secretOrPublicKey: Secret,
    verifyOptions?: VerifyOptions | undefined
  ): object | string {
    if (verifyOptions) {
      const options = verifyOptions as Object
      return jwt.verify(token, secretOrPublicKey, options)
    }
    return jwt.verify(token, secretOrPublicKey)
  }
}

export default TokenWrapper
