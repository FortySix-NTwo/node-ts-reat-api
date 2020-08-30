import express, { Application } from 'express'
import 'reflect-metadata'

import { config } from '../config'

class Server {
  constructor() {
    this.setupServer()
  }

  private setupServer = () => {
    const server: Application = express()
    const environment = config.environment
    const port = config.port
    const host = config.host
    return { server, environment, port, host }
  }

  async start() {
    try {
      console.info('Database Running')
      this.setupServer().server.listen(
        this.setupServer().port,
        this.setupServer().host,
        () => {
          console.info(`Server running`)
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
