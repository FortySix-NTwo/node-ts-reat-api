import { Server } from './server'
import { appLogger } from './config'

const main = async () => {
  try {
    const app = new Server()
    await app.start()
  } catch (error) {
    appLogger.error(error)
    process.exit(1)
  }
}
main()
