import express, { Application } from 'express'
import 'express-async-errors'

import { config, configLogger, configMiddleware, configDB } from '../config'

const server: Application = express()
const appLogger = configLogger()

const { port, host, environment } = config

class Server {
  async start() {
    try {
      await configMiddleware(server)
      await configDB()
      appLogger.info(`Database Connected`)
      server.listen(port, host, () => {
        appLogger.info(`Server Running at http://${host}:${port}`)
      })
    } catch (error) {
      this.stop(error)
    }
  }

  async stop(error: Error) {
    if (environment === 'development') {
      appLogger.error(`Internal Server Error ${error.stack}`)
    }
    appLogger.error(`Internal Server Error ${error}`)
  }
}

export default Server
