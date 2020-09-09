import http from 'http'
import express, { Application } from 'express'

import { configSocket, config } from '../config'

class Socket {
  private application: Application

  constructor() {
    this.application = express()
  }

  setupSocket = async () => {
    const { ws_endpoint } = config
    const server = http.createServer(this.application)
    try {
      const socket = await configSocket(server, ws_endpoint)
      socket.on('connection', (socket) => {
        socket.addListener('connection', () => {
          return JSON.stringify(`User Connected from: ${socket.id}`)
        })
        return socket
      })
      socket.on('disconnect', () => {
        socket.addListener('disconnect', () => {
          return JSON.stringify(`User Connected from: ${socket}`)
        })
        return socket.close
      })
      return socket
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default Socket
