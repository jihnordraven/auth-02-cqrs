import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { GoogleAuthUser } from '../types'
import { Request } from 'express'

export const GoogleUserDecorator = createParamDecorator(
  (key: keyof GoogleAuthUser, ctx: ExecutionContext) => {
    const req: Request = ctx.switchToHttp().getRequest()
    return key ? req.user[key] : req.user
  }
)
