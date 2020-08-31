import { Query } from '../../types'

export interface IRepository<T> {
  find(query?: Query<T>): Promise<T[]>
  findOne(query: Query<T>): Promise<T | undefined>
  save(...data: T[]): Promise<void>
  update(query: Query<T>, data: T): Promise<void>
  delete(query: Query<T>): Promise<void>
  count(): Promise<number>
}

export function compareQuery<T>(query: Query<T>, params: T) {
  return Object.keys(query).every(
    (key) => query[key as keyof T] === params[key as keyof T]
  )
}
