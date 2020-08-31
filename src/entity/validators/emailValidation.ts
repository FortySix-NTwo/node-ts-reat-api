import { randomBytes } from 'crypto'

import { config } from '../../config'

const { port, host } = config

const URL = `${host}:${port}`

export class EmailVerification {
  readonly random: string

  constructor(public readonly userEmail: string) {
    this.random = randomBytes(32).toString('hex')
  }

  getURL() {
    return `http://${URL}/users/verify/${this.random}`
  }
}
