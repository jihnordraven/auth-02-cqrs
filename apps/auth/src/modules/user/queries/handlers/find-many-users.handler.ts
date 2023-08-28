import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { FindManyUsersQuery } from '../impl'
import { UserRepository } from '../../user.repository'
import { NotFoundException } from '@nestjs/common'

@QueryHandler(FindManyUsersQuery)
export class FindManyUsersHandler implements IQueryHandler<FindManyUsersQuery> {
  constructor(protected userRepository: UserRepository) {}

  async execute(query: FindManyUsersQuery): Promise<any> {
    const {
      dto: {}
    } = query

    const users = await this.userRepository.findMany({})

    if (!users) throw new NotFoundException('Пользователи не найдены')

    return users
  }
}
