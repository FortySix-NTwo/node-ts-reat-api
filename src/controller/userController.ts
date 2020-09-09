import { getRepository } from 'typeorm'

import { User, UserRepository } from '../entity'
import { HTTP400Error } from '../utils'
import { ICreateDTO } from '../entity/interfaces/ICreateDTO'

class UserController {
  public execute = async ({
    fullname,
    username,
    email,
    password,
  }: ICreateDTO) => {
    try {
      const repository = new UserRepository(getRepository(User))
      const isExists = await repository.findByEmail({ email })
      if (isExists) {
        throw new HTTP400Error()
      }
      const user = await repository.insert(
        { email },
        {
          fullname,
          username,
          email,
          password,
        }
      )
      const newUser = await repository.instantiate(user)
      if (!newUser) {
        throw new Error('unable to save user')
      }
      return newUser
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default new UserController()
