import { Provider } from '../../types/enums'

export class ProviderAuthDto {
  readonly email: string
  readonly userAgent: string
  readonly provider: Provider
}
