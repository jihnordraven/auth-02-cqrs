import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { DeleteUserCommand } from '../impl'
import { UserRepository } from '../../user.repository'

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(protected userRepository: UserRepository) {}

  async execute(command: DeleteUserCommand): Promise<any> {
    const {
      dto: { id }
    } = command

    return this.userRepository.delete({ id })
  }
}
