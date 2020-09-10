import { getRepository } from 'typeorm'

import { User, UserRepository, ICreateDTO } from '../entity'
import { HTTP400Error } from '../utils'

class UserController {
  public execute = async ({
    ...params
  }: ICreateDTO): Promise<User | undefined> => {
    try {
      const repository = new UserRepository(getRepository(User))
      const isExists = await repository.findByEmail({ email: params.email })
      if (isExists) {
        throw new HTTP400Error()
      }
      const newUser = repository.instantiate(params)
      await repository.insert(newUser)
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
