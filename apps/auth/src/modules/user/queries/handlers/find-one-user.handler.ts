import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { FindOneUserQuery } from '../impl'
import { User } from '@prisma/client'
import { UserRepository } from '../../user.repository'
import { NotFoundException } from '@nestjs/common'

@QueryHandler(FindOneUserQuery)
export class FindOneUserHandler implements IQueryHandler<FindOneUserQuery> {
  constructor(protected userRepository: UserRepository) {}

  async execute(query: FindOneUserQuery): Promise<any> {
    const {
      dto: { idOrEmail }
    } = query

    const user: User | null = await this.userRepository.findOne({ idOrEmail })

    if (!user) throw new NotFoundException('Пользователь не найден')

    return user
  }
}
