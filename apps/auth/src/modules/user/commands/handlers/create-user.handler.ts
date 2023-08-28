import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateUserCommand } from '../impl'
import { UserRepository } from '../../user.repository'

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(protected userRepository: UserRepository) {}

  async execute(command: CreateUserCommand): Promise<any> {
    const {
      dto: { email, hashPassword }
    } = command

    return this.userRepository.create({ email, hashPassword })
  }
}
