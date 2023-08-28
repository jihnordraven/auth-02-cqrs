import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtPayload } from '../../types/jwt-payload.type'
import { User } from '@prisma/client'
import { UnauthorizedException } from '@nestjs/common'
import { PrismaService } from '../../modules/prisma/prisma.service'

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(protected prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',
      ignoreExpiration: false
    })
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    return payload
  }
}
