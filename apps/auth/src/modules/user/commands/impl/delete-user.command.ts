import { DeleteUserDto } from 'apps/auth/src/dtos/user'

export class DeleteUserCommand {
  constructor(public readonly dto: DeleteUserDto) {}
}
