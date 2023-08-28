import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateTokenCommand } from '../impl'
import { JwtService } from '@nestjs/jwt'
import { Token } from '@prisma/client'
import { TokenRepository } from '../../token.repository'

@CommandHandler(CreateTokenCommand)
export class CreateTokenHandler implements ICommandHandler<CreateTokenCommand> {
  constructor(protected tokenRepository: TokenRepository) {}

  async execute(command: CreateTokenCommand): Promise<any> {
    const {
      dto: { userId, userAgent }
    } = command

    return this.tokenRepository.create({
      userId,
      userAgent
    })
  }
}
