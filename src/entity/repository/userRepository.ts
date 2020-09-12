import { Repository } from 'typeorm'

import { BaseLogger } from '../../adapters'
import { User } from '../model'
import { IRepository } from '../dto'
import { Query } from 'types'

class UserRepository implements IRepository<User> {
  private readonly userRepository: Repository<User>
  private readonly userLogger = new BaseLogger('userLogger').init()
  constructor(userRepository: Repository<User>) {
    this.userRepository = userRepository
  }

  public async instantiate(data: Object): Promise<User | undefined> {
    try {
      const user = this.userRepository.create(data)
      this.userLogger.info('User instance created')
      return user
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async insert(data: Object): Promise<User | undefined> {
    this.userLogger.info('Create a new user', data)
    try {
      const newUser = this.userRepository.save(data)
      return newUser
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async findAll(): Promise<User[]> {
    return await this.userRepository.find()
  }

  public async findByEmail(email: Query<User>): Promise<User | undefined> {
    this.userLogger.info('Fetching user by email: ', email)
    try {
      const users = await this.userRepository.find({
        where: {
          email: email,
        },
      })
      if (users && users.length > 0) {
        return users[0]
      } else {
        return Promise.reject(true)
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async update(
    email: Query<User>,
    data: User
  ): Promise<User | undefined> {
    this.userLogger.info('Updating user by email: ', email)
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

  public async delete(
    email: Query<User>,
    time: Date
  ): Promise<Date | undefined> {
    this.userLogger.info('Deleting user by email: ', email)
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
