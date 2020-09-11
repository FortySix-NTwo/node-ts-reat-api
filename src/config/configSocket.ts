import { Server } from 'http'
import SocketIO from 'socket.io'
import SocketRedisAdapter from 'socket.io-redis'
import SocketIOWildcard from 'socketio-wildcard'

import { SocketController, SocketAuthorizationHandler } from '../controller'
import { config, appLogger, redisClient } from './index'

const { ws_endpoint } = config

const configSocket = (server: Server, path: string) => {
  const { ws_port, host } = config
  const socket: SocketIO.Server = SocketIO(server, {
    path: path,
  })
  socket.listen(ws_port)
  appLogger.info(`Socket Running on http://${host}:${ws_port}`)
  return socket
}

export class SocketServer {
  public server: Server
  protected path: string
  protected io: SocketIO.Server

  constructor(server: Server) {
    this.server = server
    this.path = ws_endpoint
    this.io = configSocket(this.server, this.path)
    appLogger.debug('Socket service bound to Socket.io instance')
    if (!this.io) {
      throw new Error('Can not establish a connection')
    }
    this.io.use(SocketIOWildcard())
    if (redisClient) {
      appLogger.debug(
        'Socket service initializing Redis adapter for sticky sessions...'
      )
      this.io.adapter(
        SocketRedisAdapter({
          pubClient: redisClient,
          subClient: redisClient,
        })
      )
    }
    this.io.on('connection', this.onConnect.bind(this))
  }

  protected onConnect(socket: SocketIO.Socket) {
    const info = { id: socket.id } as any
    appLogger.silly('Socket client connected', info)
    socket.on('error', this.onError.bind(this, socket))
    socket.on('disconnect', this.onDisconnect.bind(this, socket))
    for (const listener of [SocketController] || []) {
      appLogger.silly(
        `Biding socket client to "${listener.name}" listener`,
        info
      )
      listener.bindSocket(socket)
    }
  }

  protected onDisconnect(socket: SocketIO.Socket) {
    const info = { id: socket.id } as any
    appLogger.silly('Socket client disconnected', info)
  }

  public async onError(error: Error): Promise<void> {
    appLogger.error(`Unknown socket error: ${error.message}`, error)
  }

  public setAuthorizationHandler(handler: SocketAuthorizationHandler) {
    ;(this.io as any).set(
      'authorization',
      handler.onAuthorization.bind(handler)
    )
  }
}
