export type Query<T> = { [key in keyof T]?: T[key] }
