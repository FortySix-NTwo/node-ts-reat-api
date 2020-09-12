import { Request } from 'express'

export interface AuthRequest extends Request {
  auth: TokenData
}

export interface BodyRequest<T> extends AuthRequest {
  body: T
}

export interface TokenInfo {
  token: string
  expiresIn: number
}

export interface TokenData {
  userId: string
  name: string
  email: string
}

export interface SignOptions {
  algorithm?: string
  keyid?: string
  expiresIn?: string | number
  notBefore?: string | number
  audience?: string | string[]
  subject?: string
  issuer?: string
  jwtid?: string
  mutatePayload?: boolean
  noTimestamp?: boolean
  header?: object
  encoding?: string
}

export interface VerifyOptions {
  algorithms?: string[]
  audience?: string | RegExp | Array<string | RegExp>
  clockTimestamp?: number
  clockTolerance?: number
  complete?: boolean
  issuer?: string | string[]
  ignoreExpiration?: boolean
  ignoreNotBefore?: boolean
  jwtid?: string
  nonce?: string
  subject?: string
  maxAge?: string
}
