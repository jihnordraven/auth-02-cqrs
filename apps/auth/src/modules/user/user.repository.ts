import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto, DeleteUserDto, FindOneUserDto } from '../../dtos/user'
import { User } from '@prisma/client'
import { FindManyUsersDto } from '../../dtos/user/find-many-users.dto'
import { NewPasswordDto } from '../../dtos/auth'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'

@Injectable()
export class UserRepository {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}

  async create({ email, hashPassword }: CreateUserDto): Promise<User | null> {
    const password: string | null = hashPassword ? hashPassword : null

    const user: User | null = await this.prismaService.user.create({
      data: {
        email,
        password
      }
    })
    if (!user) throw new BadRequestException('Не удалось создать пользователя')
    return user
  }

  async findOne({ idOrEmail }: FindOneUserDto): Promise<User | null> {
    const user: User | null = await this.cacheManager.get<User | null>(
      idOrEmail
    )
    if (!user) {
      const user: User | null = await this.prismaService.user.findFirst({
        where: { OR: [{ id: idOrEmail }, { email: idOrEmail }] }
      })
      if (!user) return null

      await this.cacheManager.set(idOrEmail, user)
      return user
    }
    return user
  }

  async findMany({}: FindManyUsersDto): Promise<User[] | User | null> {
    const users: User[] | null = await this.prismaService.user.findMany()
    if (!users) throw new NotFoundException('Пользователи не найдены')
    return users
  }

  async newPassword({
    id,
    hashPassword
  }: {
    id: string
    hashPassword: string
  }): Promise<boolean> {
    return Boolean(
      await this.prismaService.user.update({
        where: { id },
        data: {
          password: hashPassword
        }
      })
    )
  }

  async delete({ id }: DeleteUserDto): Promise<boolean> {
    const isSuccess: boolean = Boolean(
      await this.prismaService.user.delete({ where: { id } })
    )
    if (!isSuccess) throw new NotFoundException('Пользователь не найден')
    return isSuccess
  }
}
