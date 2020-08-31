import * as jsonwebtoken from 'jsonwebtoken'

import { config } from '../../config'
import { User } from '../model/user'

export interface AuthTokenData {
  email: string
}

const { jwt } = config

export class AuthToken {
  readonly value: string

  constructor(user: User) {
    if (!jwt) throw new Error('Internal error')

    this.value = jsonwebtoken.sign({ email: user.email }, jwt, {
      expiresIn: '12h',
    })
  }

  static verify(token: string) {
    if (!jwt) throw new Error('Internal error')

    return jsonwebtoken.verify(token, jwt)
  }

  verify() {
    return AuthToken.verify(this.value)
  }
}
