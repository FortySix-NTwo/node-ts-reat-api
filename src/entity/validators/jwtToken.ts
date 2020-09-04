import * as jsonwebtoken from 'jsonwebtoken'

import { config } from '../../config'
import { User } from '../model/user'

const { jwt_secret } = config

export class AuthToken {
  readonly value: string

  constructor(user: User) {
    if (!jwt_secret) throw new Error('Internal error')

    this.value = jsonwebtoken.sign({ email: user.email }, jwt_secret, {
      expiresIn: '12h',
    })
  }

  static verify(token: string) {
    if (!jwt_secret) throw new Error('Internal error')

    return jsonwebtoken.verify(token, jwt_secret)
  }

  verify() {
    return AuthToken.verify(this.value)
  }
}
