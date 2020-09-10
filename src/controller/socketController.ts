import SocketIO from 'socket.io'
import { HTTP400Error } from '../utils'

export class SocketController {
  protected static methods: { [key: string]: (...args: any) => any } = {}

  public static bindSocket(socket: SocketIO.Socket) {
    for (const action in this.methods) {
      socket.on(action, (...args) => this.methods[action](socket, ...args))
    }
  }

  protected static bindEvent(
    eventName: string,
    action: (...args: any[]) => void
  ) {
    this.methods = this.methods || {}

    if (this.methods[eventName]) {
      throw new HTTP400Error(
        'Event is already bound in this controller for another listener'
      )
    }

    this.methods[eventName] = action.bind(this)
  }
}

export interface SocketAuthorizationHandler {
  onAuthorization(
    handshake: any,
    accept: (error: Error, accepted?: boolean) => void
  ): Promise<void>
}
