import { Query } from '../../types'
import { ICreateDTO } from './ICreateDTO'

export interface IRepository<T> {
  findAll(): Promise<T[]>
  findByID(query: Query<T>): Promise<T | undefined>
  findByEmail(query: Query<T>): Promise<T | undefined>
  instantiate(data: Object): Promise<T | undefined>
  update(query: Query<T>, data: T): Promise<T | undefined>
  insert(query: Query<T>, data: ICreateDTO): Promise<T>
  deleteByID(query: Query<T>, time: Date): Promise<Date | undefined>
}

export interface IExport<T> {
  export(query?: Query<T>): Promise<T[]>
}

export interface IService<T> {
  save(query?: Query<T>): Promise<void>
  export(service: IExport<T>): Promise<string>
}

export function validateQuery<T>(query: Query<T>, params: T) {
  return Object.keys(query).every(
    (key) => query[key as keyof T] === params[key as keyof T]
  )
}
