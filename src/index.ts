import { App, Socket } from './server'
import { appLogger } from './config'

const main = async () => {
  try {
    const app = await new App().start()
    const socket = await new Socket().start()
    return { app, socket }
  } catch (error) {
    appLogger.info(error)
    process.exit(1)
  }
}

main()
