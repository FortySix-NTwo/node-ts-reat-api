import { Query } from '../../types'
import { ICreateDTO } from './ICreateDTO'

export interface IRepository<T> {
  findAll(): Promise<T[]>
  findByEmail(query: Query<T>): Promise<T | undefined>
  instantiate(data: Object): Promise<T | undefined>
  update(query: Query<T>, data: T): Promise<T | undefined>
  insert(query: Query<T>, data: ICreateDTO): Promise<T>
  delete(query: Query<T>, time: Date): Promise<Date | undefined>
}

export function validateQuery<T>(query: Query<T>, params: T) {
  return Object.keys(query).every(
    (key) => query[key as keyof T] === params[key as keyof T]
  )
}
