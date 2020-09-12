import { Config } from '../config'
import { injectable, inject } from 'inversify'
import { readFileSync } from 'fs'

@injectable()
export class TokenProviderService {
  private _privateKey: string
  public get privateKey(): string {
    return this._privateKey
  }

  private _publicKey: string
  public get publicKey(): string {
    return this._publicKey
  }

  constructor(@inject(Config) private readonly config: Config) {
    this._privateKey = readFileSync(
      `${this.config.sourcePath}/services/token/private.key`,
      'utf8'
    )
    this._publicKey = readFileSync(
      `${this.config.sourcePath}/services/token/public.key`,
      'utf8'
    )
  }
}
