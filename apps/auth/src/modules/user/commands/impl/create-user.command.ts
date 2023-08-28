import { CreateUserDto } from 'apps/auth/src/dtos/user'

export class CreateUserCommand {
  constructor(public readonly dto: CreateUserDto) {}
}
