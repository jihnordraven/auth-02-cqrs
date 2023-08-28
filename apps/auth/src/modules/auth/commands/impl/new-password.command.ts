import { NewPasswordDto } from 'apps/auth/src/dtos/auth'

export class NewPasswordCommand {
  constructor(public readonly dto: NewPasswordDto) {}
}
