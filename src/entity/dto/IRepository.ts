import { Query } from '../../types'

export interface IRepository<T> {
  findAll(): Promise<T[]>
  findByEmail(query: Query<T>): Promise<T | undefined>
  instantiate(data: Object): Promise<T | undefined>
  update(query: Query<T>, data: T): Promise<T | undefined>
  insert(data: T): Promise<T | undefined>
  delete(query: Query<T>, time: Date): Promise<Date | undefined>
}

export function query<User>(query: Query<User>, params: User) {
  return Object.keys(query).every(
    (key) => query[key as keyof User] === params[key as keyof User]
  )
}
