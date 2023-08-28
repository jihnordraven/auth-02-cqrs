import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { LoginUserCommand } from '../impl'
import { UserRepository } from '../../../user/user.repository'
import { User } from '@prisma/client'
import { BcryptAdapter } from 'apps/auth/src/adapters/bcrypt.adapter'
import { UnauthorizedException } from '@nestjs/common'

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(
    protected userRepository: UserRepository,
    protected bcryptAdapter: BcryptAdapter
  ) {}

  async execute(command: LoginUserCommand): Promise<any> {
    const {
      dto: { email, password }
    } = command
  }
}
