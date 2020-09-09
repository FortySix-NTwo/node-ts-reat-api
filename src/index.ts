import { App } from './server'
import { appLogger } from './config'

const main = async () => {
  try {
    const app = new App()
    await app.start()
  } catch (error) {
    appLogger.info(error)
    process.exit(1)
  }
}

main()
