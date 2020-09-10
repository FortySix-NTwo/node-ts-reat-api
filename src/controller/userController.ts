import { getRepository } from 'typeorm'

import { User, UserRepository, ICreateDTO } from '../entity'
import { HTTP400Error } from '../utils'

class UserController {
  public execute = async ({ ...params }: ICreateDTO) => {
    try {
      const repository = new UserRepository(getRepository(User))
      const isExists = await repository.findByEmail({ email: params.email })
      if (isExists) {
        throw new HTTP400Error()
      }
      const newUser = repository.instantiate(params)
      if (!newUser) {
        throw new Error('unable to save user')
      }
      await repository.insert(newUser)
      return newUser
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default new UserController()
