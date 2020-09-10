import http from 'http'
import express, { Application } from 'express'

import { SocketServer, config } from '../config'

class Socket {
  private application: Application

  constructor() {
    this.application = express()
  }

  start = async () => {
    const { ws_endpoint } = config
    const server = http.createServer(this.application)
    try {
      const socket = new SocketServer(server, ws_endpoint)
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
