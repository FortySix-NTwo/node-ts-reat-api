import * as bcrypt from 'bcryptjs'

export const hashValue = async (
  rounds: number,
  password: string
): Promise<string> => {
  const salt = await bcrypt.genSalt(rounds)
  const hashed = await bcrypt.hash(password, salt)
  return hashed
}
