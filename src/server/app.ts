import express, { Application } from 'express'
import { Router, AsyncRouter } from 'express-async-router'
import 'express-async-errors'
import 'reflect-metadata'

import {
  connectionAdapter,
  routerAdapter,
  middlewareAdapter,
} from '../adapters/'

export default class App {
  private application: Application
  private router: Router

  constructor() {
    this.application = express()
    this.router = AsyncRouter()
  }

  start = async () => {
    try {
      await connectionAdapter
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
      const server = await routerAdapter(router)
        .then((router) => application.use(router))
        .finally(() => middlewareAdapter.configApplication(application))
      return server
    } catch (error) {
      throw new Error(error)
    }
  }
}
