import { Response } from 'express'
import jwt from 'jsonwebtoken'

import { options } from '../config'
import { UserRepository } from '../entity'
import { validateHash } from '../utils'
import { getRepository } from 'typeorm'
import { User, ICreateDTO } from '../entity'
import { HTTPErrors } from '../adapters'

interface Request extends ICreateDTO {}

export class AuthController {
  private readonly config = options
  public async validate(req: Request, res: Response) {
    const repository = new UserRepository(getRepository(User))
    const user = await repository.findByEmail({ email: req.email })
    if (!user) {
      throw new HTTPErrors('Unauthorized', 400)
    }

    const isValidPassword = validateHash(req.password, user.hashedValue)
    if (!isValidPassword) {
      throw new HTTPErrors('Unauthorized', 400)
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
