import { HTTPError } from './index'

class HTTP400Error extends HTTPError {
  readonly statusCode = 400
  constructor(message: string | object = 'Bad Request') {
    super(message, 400)
  }
}

class HTTP401Error extends HTTPError {
  readonly statusCode = 401
  constructor(message: string | object = 'Unauthorized') {
    super(message, 401)
  }
}

class HTTP403Error extends HTTPError {
  readonly statusCode = 403
  constructor(message: string | object = 'Forbidden') {
    super(message, 403)
  }
}

class HTTP404Error extends HTTPError {
  readonly statusCode = 404
  constructor(message: string | object = 'Method Not found') {
    super(message, 404)
  }
}

class HTTP500Error extends HTTPError {
  readonly statusCode = 500
  constructor(message: string | object = 'Internal Server Error') {
    super(message, 500)
  }
}

export { HTTP400Error, HTTP401Error, HTTP403Error, HTTP404Error, HTTP500Error }
