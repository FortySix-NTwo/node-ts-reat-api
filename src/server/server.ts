import express, { Application } from 'express'
import 'express-async-errors'
import 'reflect-metadata'

import { config, configServer } from '../config'

class Server {
  constructor() {
    this.setupServer()
  }

  setupServer() {
    const server: Application = express()
    const environment = config.environment
    const port = config.port
    const host = config.host
    return { server, environment, port, host }
  }

  async start() {
    try {
      await configServer()
      this.setupServer().server.listen(
        this.setupServer().port,
        this.setupServer().host,
        () => {
          return this.setupServer().server
        }
      )
    } catch (error) {
      this.stop(error)
    }
  }

  async stop(error: Error) {
    if (this.setupServer().environment === 'development') {
      console.error(`Internal Server Error ${error.stack}`)
      process.exit(1)
    }
    console.error(`Internal Server Error ${error}`)
    process.exit(1)
  }
}

export default Server
