import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateTokenDto } from '../../dtos/token'
import { Token } from '@prisma/client'

import { v4 } from 'uuid'
import { add } from 'date-fns'

@Injectable()
export class TokenRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create({ userId, userAgent }: CreateTokenDto): Promise<Token | null> {
    const _token: Token | null = await this.prismaService.token.findFirst({
      where: { userId, userAgent }
    })

    const token: string = _token?.token ?? ''

    return this.prismaService.token.upsert({
      where: { token },
      update: {
        token: v4(),
        exp: add(new Date(), { months: 1 })
      },
      create: {
        token: v4(),
        exp: add(new Date(), { months: 1 }),
        userId,
        userAgent
      }
    })
  }
}
