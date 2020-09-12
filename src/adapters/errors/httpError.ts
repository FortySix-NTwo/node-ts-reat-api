import { HTTPError } from './index'

export class HTTP400Error extends HTTPError {
  constructor(message: string | object = 'Bad Request', status: number = 400) {
    super(message, status)
  }
}

export class HTTP401Error extends HTTPError {
  constructor(message: string | object = 'Unauthorized', status: number = 401) {
    super(message, status)
  }
}

export class HTTP403Error extends HTTPError {
  constructor(message: string | object = 'Forbidden', status: number = 403) {
    super(message, status)
  }
}

export class HTTP404Error extends HTTPError {
  constructor(
    message: string | object = 'Method Not found',
    status: number = 404
  ) {
    super(message, status)
  }
}

export class HTTP500Error extends HTTPError {
  constructor(
    message: string | object = 'Internal Server Error',
    status: number = 500
  ) {
    super(message, status)
  }
}
