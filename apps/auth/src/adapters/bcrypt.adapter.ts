import { compare, genSaltSync, hash } from 'bcrypt'

export type HashInputType = {
  readonly password: string
}

export type CompareInputType = {
  readonly password: string
  readonly hashPassword: string
}

export class BcryptAdapter {
  async hash({ password }: HashInputType) {
    const salt: string = genSaltSync(8)
    return hash(password, salt)
  }

  async compare({ password, hashPassword }: CompareInputType) {
    return compare(password, hashPassword)
  }
}
