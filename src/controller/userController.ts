import { getRepository } from 'typeorm'

import { User, UserRepository, ICreateDTO } from '../entity'
import { HTTPErrors } from '../adapters'
import { BaseController } from './baseController'

export class UserController extends BaseController {
  public initializeRoutes(): string {
    return (this.path = this.path)
  }
  public execute = async ({
    ...params
  }: ICreateDTO): Promise<User | undefined> => {
    try {
      const repository = new UserRepository(getRepository(User))
      const isExists = await repository.findByEmail({ email: params.email })
      if (isExists) {
        throw new HTTPErrors('Bad Request', 400)
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
