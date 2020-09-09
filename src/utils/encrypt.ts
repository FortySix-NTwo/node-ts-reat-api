import * as bcrypt from 'bcryptjs'

export const hashValue = (rounds: number, password: string): string => {
  const salt = bcrypt.genSaltSync(rounds)
  const hashed = bcrypt.hashSync(password, salt)
  return hashed
}
