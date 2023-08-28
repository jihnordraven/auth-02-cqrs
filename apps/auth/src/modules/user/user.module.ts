import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { CqrsModule } from '@nestjs/cqrs'
import { UserRepository } from './user.repository'
import { FindManyUsersHandler, FindOneUserHandler } from './queries/handlers'
import { CreateUserHandler } from './commands/handlers/create-user.handler'
import { DeleteUserHandler } from './commands/handlers'

const commands = [CreateUserHandler, DeleteUserHandler]
const queries = [FindOneUserHandler, FindManyUsersHandler]
const events = []

@Module({
  imports: [CqrsModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, ...commands, ...queries, ...events],
  exports: [UserRepository, UserService]
})
export class UserModule {}
