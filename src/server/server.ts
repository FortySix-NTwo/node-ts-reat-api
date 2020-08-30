import express, { Application } from 'express'
import 'reflect-metadata'
import { createConnection } from 'typeorm'

import { ormConfig } from '../entity'
import { config } from '../config'

const server: Application = express()

const environment = config.environment
const port = config.port
const host = config.host

export default class Server {
  async start() {
    try {
      await createConnection(ormConfig)
      server.listen(port, host, () => {
        console.info(`server listening for requests at http://${host}:${port}`)
        return server
      })
    } catch (error) {
      this.stop(error)
    }
  }

  async stop(error: Error) {
    if (environment === 'development') {
      console.error(error.stack)
    }
    console.error(`Unable to Stop Server ${error}`)
  }
}
