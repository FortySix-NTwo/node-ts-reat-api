import {
  Container as InversifyContainer,
  interfaces,
  ContainerModule,
} from 'inversify'

export class Container {
  private _container: InversifyContainer = new InversifyContainer()

  protected get container(): InversifyContainer {
    return this._container
  }

  constructor() {
    this.register()
  }

  public getApp(): Application {
    return this.container.get(application)
  }

  private bindDependencies(func: Function, dependencies: any[]): Function {
    let injections = dependencies.map((dependency) => {
      return this.container.get(dependency)
    })
    return func.bind(func, ...injections)
  }

  private register(): void {
    this._container.load()
    this._container.bind<Application>(application).toSelf()
  }

  private getControllersModule(): ContainerModule {
    return new ContainerModule((bind: interfaces.Bind) => {
      bind<BaseController>(BaseController).to(/* To Controller */)
    })
  }

  private getServicesModule(): ContainerModule {
    return new ContainerModule((bind: interfaces.Bind) => {
      bind<T>(T).toSelf()
    })
  }

  private getRepositoriesModule(): ContainerModule {
    return new ContainerModule((bind: interfaces.Bind) => {
      bind<Repo>(Repo).toConstantValue(new Repo(Enitity))
    })
  }

  private getLoggersModule(): ContainerModule {
    return new ContainerModule((bind: interfaces.Bind) => {
      bind<Logger>(Logger).toSelf()
    })
  }

  private getMiddlewaresModule(): ContainerModule {
    return new ContainerModule((bind: interfaces.Bind) => {
      bind<Middleware>(Middleware).toSelf()
    })
  }

  private getConfigurationModule(): ContainerModule {
    return new ContainerModule((bind: interfaces.Bind) => {
      bind<Config>(Config).toSelf().inSingletonScope()
    })
  }

  private getHandlerModule(): ContainerModule {
    return new ContainerModule((bind: interfaces.Bind) => {
      bind<Handler>(Handler).toSelf()
    })
  }

  private getAdaptersModule(): ContainerModule {
    return new ContainerModule((bind: interfaces.Bind) => {
      bind<Adapter>(Adapter).toSelf()
    })
  }
}
