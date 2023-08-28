import { User } from '@prisma/client'

export class LoginUserDto {
  readonly user: User
  readonly userAgent: string
}
