import { CreateTokenDto } from 'apps/auth/src/dtos/token'

export class CreateTokenCommand {
  constructor(public readonly dto: CreateTokenDto) {}
}
