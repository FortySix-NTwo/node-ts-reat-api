import * as bcrypt from 'bcryptjs'

export const hashValue = (rounds: number, password: string): string => {
  const salt = bcrypt.genSaltSync(rounds)
  const hashed = bcrypt.hashSync(password, salt)
  return hashed
}

export const encodeBase64 = (encode: any[], length: number): string => {
  const encodeValue = bcrypt.encodeBase64(encode, length)
  return encodeValue
}
