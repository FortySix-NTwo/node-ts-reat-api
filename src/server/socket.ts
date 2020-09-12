import http from 'http'

import { SocketAdapter } from '../adapters'

class Socket {
  private server: http.Server

  constructor() {
    this.server = new http.Server()
  }

  start = async () => {
    try {
      const socket = new SocketAdapter(this.server)
      return socket
    } catch (error) {
      throw new Error(error)
    }
  }

  Listener(eventName: string) {
    return function (
      target: { bindEvent: (arg0: string, arg1: any) => void },
      _propertyKey: string,
      descriptor: PropertyDescriptor
    ) {
      target.bindEvent(eventName, descriptor.value)
    }
  }
}

export default Socket
