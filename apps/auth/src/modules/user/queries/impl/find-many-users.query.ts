import { FindManyUsersDto } from 'apps/auth/src/dtos/user/find-many-users.dto'

export class FindManyUsersQuery {
  constructor(public readonly dto: FindManyUsersDto) {}
}
