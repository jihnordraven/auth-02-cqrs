import { LoginUserDto } from 'apps/auth/src/dtos/user/login-user.dto'

export class LoginUserCommand {
  constructor(public readonly dto: LoginUserDto) {}
}
