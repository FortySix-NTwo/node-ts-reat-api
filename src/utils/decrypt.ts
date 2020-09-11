import * as bcrypt from 'bcryptjs'

export const validateHash = async (password: string, hash: string): boolean => {
  const isValid = await bcrypt.compare(password, hash)
  return isValid
}
