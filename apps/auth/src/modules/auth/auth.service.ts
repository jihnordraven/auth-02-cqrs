import { BadRequestException, Injectable } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import {
  LoginUserDto,
  NewPasswordDto,
  RegisterUserDto,
  ValidateUserDto
} from '../../dtos/auth'
import { User } from '@prisma/client'
import {
  GenerateTokensCommand,
  ProviderAuthCommand,
  RegisterUserCommand
} from './commands/impl'
import { CreateTokenCommand } from '../token/commands/impl'
import { Tokens } from '../../types'
import { NewPasswordCommand } from './commands/impl/new-password.command'
import { ProviderAuthDto } from '../../dtos/auth/provider-auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async register({
    email,
    password,
    userAgent
  }: RegisterUserDto): Promise<Tokens> {
    const user: User = await this.commandBus.execute(
      new RegisterUserCommand({ email, password, userAgent })
    )
    return this.commandBus.execute(
      new GenerateTokensCommand({ userId: user.id, userAgent })
    )
  }

  async login({ user, userAgent }: LoginUserDto): Promise<Tokens> {
    return this.commandBus.execute(
      new GenerateTokensCommand({ userId: user.id, userAgent })
    )
  }

  async newPassword(dto: NewPasswordDto): Promise<string> {
    return this.commandBus.execute(new NewPasswordCommand(dto))
  }

  async providerAuth(dto: ProviderAuthDto): Promise<Tokens> {
    const user: User = await this.commandBus.execute(
      new ProviderAuthCommand(dto)
    )
    return this.commandBus.execute(
      new GenerateTokensCommand({ userId: user.id, userAgent: dto.userAgent })
    )
  }
}
