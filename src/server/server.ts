import express, { Application } from 'express'
import { Router, AsyncRouter } from 'express-async-router'
import 'express-async-errors'

import { config, configApp, configLogger, configDB } from '../config'

const server: Application = express()
const router: Router = AsyncRouter()
const appLogger = configLogger()
const { port, host, environment } = config

class Server {
  async start() {
    try {
      await configApp(server, router)
      await configDB()
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
      process.exit(1)
    }
    appLogger.error(`Internal Server Error ${error}`)
    process.exit(1)
  }
}

export default Server
