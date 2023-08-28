import { Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from '@prisma/client'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':idOrEmail')
  async findOne(@Param('idOrEmail') idOrEmail: string): Promise<User> {
    return this.userService.findOne({ idOrEmail })
  }

  @Get()
  async findMany() {
    return this.userService.findMany()
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<string> {
    return this.userService.delete({ id })
  }
}
