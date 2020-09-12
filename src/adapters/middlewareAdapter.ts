import { Application } from 'express'
import { injectable, inject } from 'inversify'

import { Config } from '../config'
import { registerMiddleware } from '../wrappers/'
import { middleware } from '../middleware'
import { BaseLogger } from './logger'

@injectable()
class MiddlewareAdapter {
  @inject(Config) private readonly config: Config
  @inject(BaseLogger) private readonly appLogger = new BaseLogger(
    'appLogger'
  ).init()

  configApplication = async (
    application: Application
  ): Promise<Application> => {
    try {
      registerMiddleware(middleware, application)
      application.listen(this.config.app_port, this.config.app_host, () => {
        this.appLogger.info(
          `Server Listening on http://${this.config.app_host}:${this.config.app_port}`
        )
      })
      return application
    } catch (error) {
      if (this.config.node_environment === 'development') {
        throw new Error(error.stack)
      }
      throw new Error(error)
    }
  }
}

export const middlewareAdapter = new MiddlewareAdapter()
