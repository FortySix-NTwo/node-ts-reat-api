import express, { Application } from 'express'
import 'express-async-errors'
import { Router, AsyncRouter } from 'express-async-router'

import { configApplication, configRouter, configDB } from '../config'

class App {
  private application: Application
  private router: Router

  constructor() {
    this.application = express()
    this.router = AsyncRouter()
  }

  start = async () => {
    try {
      const app = this.application
      const router = this.router
      const server = await this.setupServer(app, router)
      return server
    } catch (error) {
      throw new Error(error)
    }
  }

  private setupServer = async (application: Application, router: Router) => {
    try {
      await configDB().then(async () => {
        const server = await configRouter(router)
          .then((router) => application.use(router))
          .finally(() => configApplication(application))
        return server
      })
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default App
