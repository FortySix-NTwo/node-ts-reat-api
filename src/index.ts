import { App, Socket } from './server'
import { BaseLogger } from './adapters'

const main = async () => {
  const appLogger = new BaseLogger('appLogger').init()
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
