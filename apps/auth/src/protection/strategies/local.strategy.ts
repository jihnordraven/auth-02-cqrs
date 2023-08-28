import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthRepository } from '../../modules/auth/auth.repository'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authRepository: AuthRepository) {
    super({
      usernameField: 'email'
    })
  }

  async validate(email: string, password: string) {
    return this.authRepository.validateUser({ email, password })
  }
}
