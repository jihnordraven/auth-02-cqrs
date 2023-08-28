import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { ProviderAuthCommand } from '../impl'
import { User } from '@prisma/client'
import { UserRepository } from '../../../user/user.repository'
import { BadRequestException, ConflictException } from '@nestjs/common'

@CommandHandler(ProviderAuthCommand)
export class ProviderAuthHandler
  implements ICommandHandler<ProviderAuthCommand>
{
  constructor(protected userRepository: UserRepository) {}

  async execute(command: ProviderAuthCommand): Promise<any> {
    const { dto } = command

    const isUser: User | null = await this.userRepository.findOne({
      idOrEmail: dto.email
    })
    if (isUser) throw new ConflictException('Этот email уже занят')

    const user: User | null = await this.userRepository.create({
      email: dto.email
    })
    if (!user) throw new BadRequestException('Не удалось создать пользователя')

    return user
  }
}
