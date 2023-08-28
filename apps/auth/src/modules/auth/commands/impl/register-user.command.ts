import { RegisterUserDto } from 'apps/auth/src/dtos/auth'

export class RegisterUserCommand {
  constructor(public readonly dto: RegisterUserDto) {}
}
