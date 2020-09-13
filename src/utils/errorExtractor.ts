import { options } from '../config'
import { ValidationError, HTTPErrors } from '../adapters'
import { ErrorWithCode } from '../types/errors'

export interface ErrorResult {
  code: number
  message: string
  type?: string
  errors?: string[]
  stack?: string
}
export const errorWrapper = (error: ErrorWithCode): ErrorResult => {
  let result: ErrorResult = {
    code: error.code,
    message: error.message,
  }
  if (error instanceof HTTPErrors) {
    result.code = error.code
    result.message = error.message
  }
  if (error instanceof ValidationError) {
    result.code = error.code
    result.message = error.message
    result.errors = error.errors
    result.type = error.type
    if (options.node_environment === 'development') {
      result.stack = error.stack
    }
  }
  return result
}
