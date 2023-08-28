import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { GenerateTokensCommand } from '../impl'
import { JwtService } from '@nestjs/jwt'
import { Token } from '@prisma/client'
import { TokenRepository } from '../../../token/token.repository'

@CommandHandler(GenerateTokensCommand)
export class GenerateTokensHandler
  implements ICommandHandler<GenerateTokensCommand>
{
  constructor(
    protected jwtService: JwtService,
    protected tokenReposiotry: TokenRepository
  ) {}

  async execute(command: GenerateTokensCommand): Promise<any> {
    const {
      dto: { userId, userAgent }
    } = command

    const accessToken: string =
      'Bearer ' +
      this.jwtService.sign({ userId }, { secret: 'secret', expiresIn: '7d' })

    const refreshToken: Token = await this.tokenReposiotry.create({
      userId,
      userAgent
    })

    return { accessToken, refreshToken }
  }
}
