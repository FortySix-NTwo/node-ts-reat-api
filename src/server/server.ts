import express, { Application } from 'express'
import { Router, AsyncRouter } from 'express-async-router'

import { configApp } from '../config'

class Server {
  async start() {
    const server: Application = express()
    const router: Router = AsyncRouter()
    try {
      await configApp(server, router)
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default Server
