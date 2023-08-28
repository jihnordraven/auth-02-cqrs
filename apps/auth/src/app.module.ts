import { Module } from '@nestjs/common'
import { UserModule } from './modules/user/user.module'
import { PrismaModule } from './modules/prisma/prisma.module'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './modules/auth/auth.module'
import { TokenModule } from './modules/token/token.module'

import { CacheModule } from '@nestjs/cache-manager'
import { redisStore } from 'cache-manager-redis-yet'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: 'localhost',
            port: 6379
          }
        })
      })
    }),
    UserModule,
    AuthModule,
    PrismaModule,
    TokenModule
  ]
})
export class AppModule {}
