import { Server } from 'http'
import socketIO from 'socket.io'
import { appLogger, config } from './index'

//TODO: change to Factory pattern (i.e builder)
export const configSocket = async (server: Server, path: string) => {
  const { ws_port, host } = config
  try {
    const socket: socketIO.Server = socketIO(server, {
      path,
    })
    socket.listen(ws_port)
    appLogger.info(`Socket Running on http://${host}:${ws_port}`)
    return socket
  } catch (error) {
    throw new Error(error)
  }
}
