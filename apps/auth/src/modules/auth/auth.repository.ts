import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateTokenDto } from '../../dtos/token'
import { Token, User } from '@prisma/client'
import { v4 } from 'uuid'
import { add } from 'date-fns'
import { ValidateUserDto } from '../../dtos/auth'
import { UserRepository } from '../user/user.repository'
import { BcryptAdapter } from '../../adapters/bcrypt.adapter'

@Injectable()
export class AuthRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userRepository: UserRepository,
    private readonly bcryptAdapter: BcryptAdapter
  ) {}

  async validateUser({ email, password }: ValidateUserDto) {
    const user: User | null = await this.userRepository.findOne({
      idOrEmail: email
    })
    if (!user) throw new UnauthorizedException('Неверный логин или пароль')

    const isValidPassword: boolean = await this.bcryptAdapter.compare({
      password: password,
      hashPassword: user.password
    })
    if (!isValidPassword)
      throw new UnauthorizedException('Неверный логин или пароль')

    return user
  }
}
