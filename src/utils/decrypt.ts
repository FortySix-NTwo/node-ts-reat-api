import * as bcrypt from 'bcryptjs'

export const validateHash = (password: string, hash: string): boolean => {
  const isValid = bcrypt.compareSync(password, hash)
  return isValid
}

export const decodeBase64 = (value: string, length: number): number[] => {
  const decodedValue = bcrypt.decodeBase64(value, length)
  return decodedValue
}
