import { HTTPClientError } from './index'

class HTTP400Error extends HTTPClientError {
  readonly statusCode = 400
  constructor(message: string | object = 'Bad Request') {
    super(message)
  }
}

class HTTP401Error extends HTTPClientError {
  readonly statusCode = 401
  constructor(message: string | object = 'Unauthorized') {
    super(message)
  }
}

class HTTP403Error extends HTTPClientError {
  readonly statusCode = 403
  constructor(message: string | object = 'Forbidden') {
    super(message)
  }
}

class HTTP404Error extends HTTPClientError {
  readonly statusCode = 404
  constructor(message: string | object = 'Not found') {
    super(message)
  }
}

export { HTTP400Error, HTTP401Error, HTTP403Error, HTTP404Error }
