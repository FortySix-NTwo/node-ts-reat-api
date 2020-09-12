export type Secret =
  | string
  | Buffer
  | { key: string | Buffer; passphrase: string }
