import { FindOneUserDto } from 'apps/auth/src/dtos/user'

export class FindOneUserQuery {
  constructor(public readonly dto: FindOneUserDto) {}
}
