import { Response } from 'express'
import jwt from 'jsonwebtoken'

import { config } from '../config'
import { UserRepository } from '../entity'
import { validateHash, HTTP401Error } from '../utils'
import { getRepository } from 'typeorm'
import { User, ICreateDTO } from '../entity'

const { jwt_secret } = config

interface Request extends ICreateDTO {}

class AuthController {
  authenticate = async (req: Request, res: Response) => {
    const repository = new UserRepository(getRepository(User))
    const user = await repository.findByEmail({ email: req.email })
    if (!user) {
      return new HTTP401Error()
    }

    const isValidPassword = validateHash(req.password, user.hashedValue)
    if (!isValidPassword) {
      return new HTTP401Error()
    }

    const token = jwt.sign({}, jwt_secret, {
      subject: user.email,
      expiresIn: '1d',
    })
    return res.status(200).json({
      user,
      token,
    })
  }
}

export default new AuthController()
