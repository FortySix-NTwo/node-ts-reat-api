import express, { Application } from 'express'
import 'express-async-errors'
import { Router, AsyncRouter } from 'express-async-router'

import { configServer, configRouter, configDB } from '../config'

class Server {
  private server: Application
  private router: Router

  constructor() {
    this.server = express()
    this.router = AsyncRouter()
  }

  start = async () => {
    try {
      await this.setupServer()
    } catch (error) {
      throw new Error(error)
    }
  }

  setupServer = async () => {
    try {
      await configDB()
      await configRouter(this.router)
      this.server.use(this.router)
      await configServer(this.server)
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default Server
