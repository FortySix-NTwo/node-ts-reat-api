import { options } from '../../config'
import { Logger } from '../../adapters'

export class HTTPErrors extends Error {
  private readonly config = options
  private readonly errorLogger = Logger('errorLogger')
  public status: number
  public message: any
  constructor(message: object | string, status: number) {
    super(`HTTP ${status} Error: ${message}`)
    this.message = message
    this.status = status
    this.errorLogger.error(`HTTP ${status} Error: ${message}`)
    if (this.config.node_environment === 'development') {
      Error.captureStackTrace(this, this.constructor)
      this.errorLogger.error(
        `HTTP ${status} Error: ${message}, Stack: ${this.stack}`
      )
    }
  }
}
