import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { JwtPayload } from '../types/jwt-payload.type'

export const LocalAuthDecorator = createParamDecorator(
  (_, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest()
    return req.user
  }
)
