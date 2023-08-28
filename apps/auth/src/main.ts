import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ConfigService } from '@nestjs/config'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

const bootstrap = async () => {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule)

    app.enableCors()
    app.setGlobalPrefix('api')
    app.use(cookieParser())

    const configService = app.get(ConfigService)

    const PORT: number = configService.get<number>('PORT')
    const HOST: string = configService.get<string>('HOST')

    await app.listen(PORT, () =>
      console.log(`Server is running on ${HOST}:${PORT}`)
    )
  } catch (e) {
    console.log(e)
  }
}

bootstrap()
