import { Injectable } from '@nestjs/common'
import { UserRepository } from './user.repository'
import { CreateUserDto, DeleteUserDto, FindOneUserDto } from '../../dtos/user'
import { User } from '@prisma/client'
import { FindManyUsersDto } from '../../dtos/user/find-many-users.dto'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { CreateUserCommand, DeleteUserCommand } from './commands/impl'
import { FindOneUserQuery } from './queries/impl'

@Injectable()
export class UserService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async create({ email, hashPassword }: CreateUserDto): Promise<User> {
    return this.commandBus.execute(
      new CreateUserCommand({ email, hashPassword })
    )
  }

  async findOne({ idOrEmail }: FindOneUserDto): Promise<User> {
    return this.queryBus.execute(new FindOneUserQuery({ idOrEmail }))
  }

  async findMany() {
    return null
  }

  async delete(dto: DeleteUserDto) {
    return this.commandBus.execute(new DeleteUserCommand({ id: dto.id }))
  }
}
