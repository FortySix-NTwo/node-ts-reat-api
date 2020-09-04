import { Server } from './server'
import { appLogger } from './config'

const main = async () => {
  try {
    const app = new Server()
    await app.start()
  } catch (error) {
    appLogger.info(error)
  }
}

main()
