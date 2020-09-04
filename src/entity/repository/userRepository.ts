import { getRepository, Repository } from 'typeorm'

import { IRepository } from '../interfaces'
import { User } from '../model'
import { Query } from 'types'

import { appLogger } from '../../config'
import { ICreateDTO } from '../interfaces/ICreateDTO'

class UserRepository implements IRepository<User> {
  readonly userRepository: Repository<User>
  private userLogger = appLogger.info

  constructor() {
    this.userRepository = getRepository(User)
  }

  async instantiate(data: Object): Promise<User | undefined> {
    try {
      const user = this.userRepository.create(data)
      this.userLogger('User instance created')
      return user
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async insert(id: Query<User>, data: ICreateDTO): Promise<User> {
    this.userLogger('Create a new user', data)
    try {
      const user = await this.userRepository.findOne(id)
      if (user) {
        const newUser = this.userRepository.create(data)
        return newUser
      }
      return Promise.reject(true)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.find()
  }

  async findOneByID(id: Query<User>): Promise<User | undefined> {
    this.userLogger('Fetching user by id: ', id)
    try {
      if (id) {
        return await this.userRepository.findOne(id)
      }
      return Promise.reject(false)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async findByEmail(email: Query<User>): Promise<User | undefined> {
    this.userLogger('Fetching user by email: ', email)
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

  async update(id: Query<User>, data: User): Promise<User | undefined> {
    this.userLogger('Updating user by id: ', id)
    try {
      const user = await this.userRepository.findOne(id)
      if (user) {
        const updatedUser = await this.userRepository.save(data)
        return updatedUser
      }
      return Promise.reject(true)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async deleteByID(id: Query<User>, time: Date): Promise<Date | undefined> {
    this.userLogger('Deleting user by id: ', id)
    try {
      const user = await this.userRepository.findOne(id)
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
