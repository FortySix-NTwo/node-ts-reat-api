import { readFileSync } from 'fs'

export class TokenProviderService {
  private _privateKey: string
  public get privateKey(): string {
    return this._privateKey
  }

  private _publicKey: string
  public get publicKey(): string {
    return this._publicKey
  }

  constructor() {
    this._privateKey = readFileSync(``, 'utf8')
    this._publicKey = readFileSync(``, 'utf8')
  }
}
