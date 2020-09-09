import { getRepository, Repository } from 'typeorm'

import { appLogger } from '../../config'
import { User } from '../model'
import { Query } from '../../types'
import { IRepository, ICreateDTO } from '../interfaces'

class UserRepository implements IRepository<User> {
  readonly userRepository: Repository<User> = getRepository(User)
  constructor(userRepository: Repository<User>) {
    this.userRepository = userRepository
  }

  async instantiate(data: Object): Promise<User | undefined> {
    try {
      const user = this.userRepository.create(data)
      appLogger.info('User instance created')
      return user
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async insert(email: Query<User>, data: ICreateDTO): Promise<User> {
    appLogger.info('Create a new user', data)
    try {
      const user = await this.findByEmail(email)
      if (user) {
        const newUser = this.userRepository.save(data)
        return newUser
      }
      return Promise.reject(true)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find()
  }

  async findByEmail(email: Query<User>): Promise<User | undefined> {
    appLogger.info('Fetching user by email: ', email)
    try {
      const users = await this.userRepository.find({
        where: {
          email: email,
        },
      })
      if (users && users.length > 0) {
        return users[0]
      } else {
        return undefined
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async update(email: Query<User>, data: User): Promise<User | undefined> {
    appLogger.info('Updating user by email: ', email)
    try {
      const user = await this.userRepository.findOneOrFail(email)
      if (user) {
        const updatedUser = await this.userRepository.save(data)
        return updatedUser
      }
      return Promise.reject(true)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async delete(email: Query<User>, time: Date): Promise<Date | undefined> {
    appLogger.info('Deleting user by email: ', email)
    try {
      const user = await this.userRepository.findOneOrFail(email)
      if (user) {
        await this.userRepository.delete(user)
        return time
      }
      return Promise.reject(true)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export default UserRepository
