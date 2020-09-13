import { App, Socket } from './server'
import { Logger } from './adapters'

const main = async () => {
  const logger = Logger('appLogger')
  try {
    const app = await new App().start()
    const socket = await new Socket().start()
    return { app, socket }
  } catch (error) {
    logger.info(error)
    process.exit(1)
  }
}

main()
