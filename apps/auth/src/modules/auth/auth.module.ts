import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { CqrsModule } from '@nestjs/cqrs'
import { BcryptAdapter } from '../../adapters/bcrypt.adapter'
import { UserModule } from '../user/user.module'
import { RegisterUserHandler, GenerateTokensHandler } from './commands/handlers'
import { JwtModule } from '@nestjs/jwt'
import { TokenModule } from '../token/token.module'
import {
  GoogleStrategy,
  JwtStrategy,
  LocalStrategy
} from '../../protection/strategies'
import { AuthRepository } from './auth.repository'
import { HttpModule } from '@nestjs/axios'

const commands = [RegisterUserHandler, GenerateTokensHandler]
const queries = []

const adapters = [BcryptAdapter]

const strategies = [LocalStrategy, JwtStrategy, GoogleStrategy]

@Module({
  imports: [CqrsModule, UserModule, JwtModule, TokenModule, HttpModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    ...commands,
    ...queries,
    ...adapters,
    ...strategies
  ],
  exports: [AuthService, AuthRepository]
})
export class AuthModule {}
