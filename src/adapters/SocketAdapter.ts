import { Server } from 'http'
import SocketIO from 'socket.io'
import SocketRedisAdapter from 'socket.io-redis'
import SocketIOWildcard from 'socketio-wildcard'
import winston from 'winston'

import { SocketController, SocketAuthorizationHandler } from '../controller'
import { options } from '../config'
import { Logger, CacheAdapter } from './index'

export class SocketAdapter {
  private readonly config = options
  private readonly logger = Logger('socketLogger')
  private readonly client = new CacheAdapter().init()
  public server: Server
  protected path: string
  protected io: SocketIO.Server

  constructor(server: Server) {
    this.server = server
    this.path = this.config.ws_endpoint
    this.io = this.configSocket(
      this.server,
      this.path,
      this.config.ws_port,
      this.config.app_host,
      this.logger
    )
    this.logger.debug('Socket service bound to Socket.io instance')
    if (!this.io) {
      throw new Error('Can not establish a connection')
    }
    this.io.use(SocketIOWildcard())
    if (this.client) {
      this.logger.debug(
        'Socket service initializing Redis adapter for sticky sessions...'
      )
      this.io.adapter(
        SocketRedisAdapter({
          pubClient: this.client,
          subClient: this.client,
        })
      )
    }
    this.io.on('connection', this.onConnect.bind(this))
  }

  protected configSocket(
    server: Server,
    path: string,
    port: number,
    host: string,
    logger: winston.Logger
  ) {
    const socket = SocketIO(server, {
      path: path,
    })
    socket.listen(port)
    logger.info(`Socket Running on http://${host}:${port}`)
    return socket
  }

  protected onConnect(socket: SocketIO.Socket) {
    const info = { id: socket.id } as any
    this.logger.silly('Socket client connected', info)
    socket.on('error', this.onError.bind(this, socket))
    socket.on('disconnect', this.onDisconnect.bind(this, socket))
    for (const listener of [SocketController] || []) {
      this.logger.silly(
        `Biding socket client to "${listener.name}" listener`,
        info
      )
      listener.bindSocket(socket)
    }
  }

  protected onDisconnect(socket: SocketIO.Socket) {
    const info = { id: socket.id } as any
    this.logger.silly('Socket client disconnected', info)
  }

  public async onError(error: Error): Promise<void> {
    this.logger.error(`Unknown socket error: ${error.message}`, error)
  }

  public setAuthorizationHandler(handler: SocketAuthorizationHandler) {
    ;(this.io as any).set(
      'authorization',
      handler.onAuthorization.bind(handler)
    )
  }
}
