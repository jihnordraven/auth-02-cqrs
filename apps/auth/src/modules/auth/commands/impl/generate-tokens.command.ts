import { GenerateTokensDto } from 'apps/auth/src/dtos/auth'

export class GenerateTokensCommand {
  constructor(public readonly dto: GenerateTokensDto) {}
}
