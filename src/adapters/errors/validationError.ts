import { HTTPErrors } from './index'
import { ValidationErrorType } from '../../types'

export class ValidationError extends HTTPErrors {
  public type: ValidationErrorType
  public errors: string[]

  constructor(type: ValidationErrorType, errors: string | string[]) {
    super(errors, 400)
    Object.setPrototypeOf(this, ValidationError.prototype)
    this.type = type
    this.errors = errors instanceof Array ? errors : [errors]
  }
}
