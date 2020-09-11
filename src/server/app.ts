import express, { Application } from 'express'
import { Router, AsyncRouter } from 'express-async-router'
import 'express-async-errors'
import 'reflect-metadata'

import { configApplication, configRouter, configDB, configORM } from '../config'

class App {
  private application: Application
  private router: Router

  constructor() {
    this.application = express()
    this.router = AsyncRouter()
  }

  start = async () => {
    try {
      const server = await this.setupServer(this.application, this.router)
      return server
    } catch (error) {
      throw new Error(error)
    }
  }

  private setupServer = async (
    application: Application,
    router: Router
  ): Promise<Application> => {
    try {
      await configDB(configORM)
      const server = await configRouter(router)
        .then((router) => application.use(router))
        .finally(() => configApplication(application))
      return server
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default App
