export interface IUser {
  id: number
  fullname: string
  username: string
  email: string
  hashedValue: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}
