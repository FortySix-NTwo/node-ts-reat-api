import { Server } from './server'
import { appLogger } from './config'

const server = new Server()

const main = async () => {
  try {
    await server.start()
  } catch (error) {
    appLogger.info(error)
  }
}

main()
