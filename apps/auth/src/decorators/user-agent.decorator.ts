import { createParamDecorator } from '@nestjs/common'
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host'

export const UserAgent = createParamDecorator(
  (_, ctx: ExecutionContextHost) => {
    const req = ctx.switchToHttp().getRequest()
    return req.headers['user-agent']
  }
)
