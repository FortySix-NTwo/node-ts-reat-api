import * as bcrypt from 'bcryptjs'

export const hashValue = (rounds: number, password: string): string => {
  const salt = bcrypt.genSaltSync(rounds)
  const hashed = bcrypt.hashSync(password, salt)
  return hashed
}

export const validateHash = (password: string, hash: string): boolean => {
  const isValid = bcrypt.compareSync(password, hash)
  return isValid
}

export const encodeBase64 = (encode: any[], length: number): string => {
  const encodeValue = bcrypt.encodeBase64(encode, length)
  return encodeValue
}

export const decodeBase64 = (value: string, length: number): number[] => {
  const decodedValue = bcrypt.decodeBase64(value, length)
  return decodedValue
}
