import { Module } from '@nestjs/common'
import { TokenService } from './token.service'
import { TokenController } from './token.controller'
import { TokenRepository } from './token.repository'
import { CreateTokenHandler } from './commands/handlers/create-token.handler'

const commands = [CreateTokenHandler]
const queries = []

@Module({
  controllers: [TokenController],
  providers: [TokenService, TokenRepository, ...commands, ...queries],
  exports: [TokenRepository]
})
export class TokenModule {}
