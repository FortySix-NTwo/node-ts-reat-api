import { Application } from 'express'

import { options } from '../config'
import { registerMiddleware } from '../wrappers/'
import { middleware } from '../middleware'
import { Logger } from './logger'
import { HTTPErrors } from './errors/errorAdapter'

class MiddlewareAdapter {
  private readonly config = options
  private readonly logger = Logger('appLogger')
  public application: Application
  constructor(application: Application) {
    this.application = application
  }
  configApplication = async (): Promise<Application> => {
    try {
      registerMiddleware(middleware, this.application)
      this.application.listen(
        this.config.app_port,
        this.config.app_host,
        () => {
          this.logger.info(
            `Server Listening on http://${this.config.app_host}:${this.config.app_port}`
          )
        }
      )
      return this.application
    } catch (error) {
      if (this.config.node_environment === 'development') {
        throw new HTTPErrors(error.stack, 500)
      }
      throw new HTTPErrors(error, 500)
    }
  }
}

export const middlewareAdapter = (application: Application) =>
  new MiddlewareAdapter(application)
