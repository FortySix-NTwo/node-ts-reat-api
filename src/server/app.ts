import express, { Application } from 'express'
import { Router, AsyncRouter } from 'express-async-router'
import 'express-async-errors'

import {
  connectionAdapter,
  routerAdapter,
  middlewareAdapter,
  HTTPErrors,
} from '../adapters'

export default class App {
  private readonly application: Application
  private readonly router: Router
  private server: Application
  constructor() {
    this.application = express()
    this.router = AsyncRouter()
  }

  start = async () => {
    try {
      this.server = await connectionAdapter.then(
        async () => await this.setupServer(this.application, this.router)
      )
      return this.server
    } catch (error) {
      throw new HTTPErrors(error, 500)
    }
  }

  private setupServer = async (
    application: Application,
    router: Router
  ): Promise<Application> => {
    try {
      this.server = await routerAdapter(router)
        .then(() => application.use(router))
        .finally(
          async () =>
            await middlewareAdapter(this.application).configApplication()
        )
      return this.server
    } catch (error) {
      throw new HTTPErrors(error, 500)
    }
  }
}
