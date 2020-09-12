import { getRepository } from 'typeorm'
import {
  Container as InversifyContainer,
  interfaces,
  ContainerModule,
} from 'inversify'

import { App } from '../server'
import { Config } from './index'
import { BaseLogger } from 'adapters'
import { BaseController, AuthController } from '../controller'
import { TokenService } from '../services'
import { User, UserRepository } from '../entity'
import { AuthHandler, CacheHandler } from 'router'
import TokenWrapper from 'wrappers/tokenWrapper'
import { ConnectionAdapter } from 'adapters/PostgresConnectionAdapter'

export class Container {
  private _container: InversifyContainer = new InversifyContainer()

  protected get container(): InversifyContainer {
    return this._container
  }

  constructor() {
    this.register()
  }

  public getApp(): App {
    return this.container.get(App)
  }

  // private bindDependencies(func: Function, dependencies: any[]): Function {
  //   let injections = dependencies.map((dependency) => {
  //     return this.container.get(dependency)
  //   })
  //   return func.bind(func, ...injections)
  // }

  private register(): void {
    this._container.load(this.getRepositoriesModule())
    this._container.load(this.getLoggersModule())
    this._container.load(this.getMiddlewareModule())
    this._container.load(this.getGeneralModule())
    this._container.load(this.getControllersModule())
    this._container.load(this.getHandlerModule())
    this._container.load(this.getServicesModule())
    this._container.load(this.getAdaptersModule())

    this._container.bind<App>(App).toSelf()
  }

  private getControllersModule(): ContainerModule {
    return new ContainerModule((bind: interfaces.Bind) => {
      bind<BaseController>(BaseController).to(AuthController)
    })
  }

  private getServicesModule(): ContainerModule {
    return new ContainerModule((bind: interfaces.Bind) => {
      bind<TokenService>(TokenService).toSelf()
    })
  }

  private getRepositoriesModule(): ContainerModule {
    return new ContainerModule((bind: interfaces.Bind) => {
      bind<UserRepository>(UserRepository).toConstantValue(
        new UserRepository(getRepository(User))
      )
    })
  }

  private getLoggersModule(): ContainerModule {
    return new ContainerModule((bind: interfaces.Bind) => {
      bind<BaseLogger>(BaseLogger).toSelf()
    })
  }

  private getMiddlewareModule(): ContainerModule {
    return new ContainerModule((bind: interfaces.Bind) => {
      bind<AuthHandler>(AuthHandler).toSelf()
    })
  }

  private getGeneralModule(): ContainerModule {
    return new ContainerModule((bind: interfaces.Bind) => {
      bind<Config>(Config).toSelf().inSingletonScope()
      bind<ConnectionAdapter>(ConnectionAdapter).toSelf()
    })
  }

  private getHandlerModule(): ContainerModule {
    return new ContainerModule((bind: interfaces.Bind) => {
      bind<AuthHandler>(AuthHandler).toSelf()
      bind<CacheHandler>(CacheHandler).toSelf()
    })
  }

  private getAdaptersModule(): ContainerModule {
    return new ContainerModule((bind: interfaces.Bind) => {
      bind<TokenWrapper>(TokenWrapper).toSelf()
    })
  }
}
