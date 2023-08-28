import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { RegisterUserCommand } from '../impl'
import { UserRepository } from '../../../user/user.repository'
import { BadRequestException, ConflictException } from '@nestjs/common'
import { BcryptAdapter } from 'apps/auth/src/adapters/bcrypt.adapter'
import { User } from '@prisma/client'
import { Tokens } from 'apps/auth/src/types'

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements ICommandHandler<RegisterUserCommand>
{
  constructor(
    protected userRepository: UserRepository,
    protected bcryptAdapter: BcryptAdapter
  ) {}

  async execute(command: RegisterUserCommand): Promise<any> {
    const {
      dto: { email, password }
    } = command

    const isUser: User | null = await this.userRepository.findOne({
      idOrEmail: email
    })

    if (isUser)
      throw new ConflictException('Пользователь с таким email уже существует')

    const hashPassword: string = await this.bcryptAdapter.hash({ password })

    const user: User | null = await this.userRepository.create({
      email,
      hashPassword
    })

    if (!user) throw new BadRequestException('Не удалось создать пользователя')

    return user
  }
}
