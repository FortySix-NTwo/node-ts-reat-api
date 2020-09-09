import * as bcrypt from 'bcryptjs'

export const validateHash = (password: string, hash: string): boolean => {
  const isValid = bcrypt.compareSync(password, hash)
  return isValid
}
