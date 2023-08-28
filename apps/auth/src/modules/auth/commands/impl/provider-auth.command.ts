import { ProviderAuthDto } from 'apps/auth/src/dtos/auth/provider-auth.dto'

export class ProviderAuthCommand {
  constructor(public readonly dto: ProviderAuthDto) {}
}
