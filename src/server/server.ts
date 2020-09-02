import express, { Application } from 'express'
import { Router, AsyncRouter } from 'express-async-router'

import { configApp } from '../config'

const server: Application = express()
const router: Router = AsyncRouter()

class Server {
  async start() {
    try {
      await configApp(server, router)
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default Server
