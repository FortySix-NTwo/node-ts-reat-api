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
      await this.setupServer()
    } catch (error) {
      throw new Error(error)
    }
  }

  setupServer = async () => {
    try {
      await configDB()
      await configRouter(this.router)
      await this.application.use(this.router)
      await configApplication(this.application)
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default App
