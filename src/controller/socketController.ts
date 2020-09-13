import SocketIO from 'socket.io'
import { HTTPErrors } from '../adapters'

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
      throw new HTTPErrors(
        'Event is already bound in this controller for another listener',
        400
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
