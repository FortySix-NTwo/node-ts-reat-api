import { Response } from 'express'
import jwt from 'jsonwebtoken'
import { inject, injectable } from 'inversify'

import { Config } from '../config'
import { UserRepository } from '../entity'
import { validateHash } from '../utils'
import { getRepository } from 'typeorm'
import { User, ICreateDTO } from '../entity'
import { HTTP401Error } from '../adapters'
import { BaseController } from './baseController'

interface Request extends ICreateDTO {}

@injectable()
export class AuthController extends BaseController {
  @inject(Config) private readonly config: Config
  public initializeRoutes(): void {
    throw new Error('Method not implemented.')
  }
  public async validate(req: Request, res: Response) {
    const repository = new UserRepository(getRepository(User))
    const user = await repository.findByEmail({ email: req.email })
    if (!user) {
      return new HTTP401Error()
    }

    const isValidPassword = validateHash(req.password, user.hashedValue)
    if (!isValidPassword) {
      return new HTTP401Error()
    }

    const token = jwt.sign({}, this.config.jwt_secret, {
      subject: user.email,
      expiresIn: '1d',
    })
    return res.status(200).json({
      user,
      token,
    })
  }
}
