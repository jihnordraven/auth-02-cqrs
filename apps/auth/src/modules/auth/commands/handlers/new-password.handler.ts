import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { NewPasswordCommand } from '../impl/new-password.command'
import { UserRepository } from '../../../user/user.repository'
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { BcryptAdapter } from 'apps/auth/src/adapters/bcrypt.adapter'
import { User } from '@prisma/client'

@CommandHandler(NewPasswordCommand)
export class NewPasswordHandler implements ICommandHandler<NewPasswordCommand> {
  constructor(
    protected userRepository: UserRepository,
    protected bcryptAdapter: BcryptAdapter
  ) {}

  async execute(command: NewPasswordCommand): Promise<any> {
    const {
      dto: { id, userId, oldPassword, newPassword }
    } = command

    if (id !== userId) throw new UnauthorizedException('Недостаточно прав')

    const user: User | null = await this.userRepository.findOne({
      idOrEmail: userId
    })
    if (!user) throw new NotFoundException('Пользователь не найден')

    const isValidPassword: boolean = await this.bcryptAdapter.compare({
      password: oldPassword,
      hashPassword: user.password
    })
    if (!isValidPassword)
      throw new UnauthorizedException('Неверный старый пароль')

    const hashPassword: string = await this.bcryptAdapter.hash({
      password: newPassword
    })

    const status: boolean = await this.userRepository.newPassword({
      id,
      hashPassword
    })

    if (!status) throw new BadRequestException('Не удалось изменить пароль')
    return 'Пароль успешно изменён'
  }
}
