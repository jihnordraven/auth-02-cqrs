import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { NewPasswordDto, RegisterUserDto } from '../../dtos/auth'
import { User } from '@prisma/client'
import {
  GoogleUserDecorator,
  JwtPayloadDecorator,
  LocalAuthDecorator,
  UserAgent
} from '../../decorators'
import { Tokens } from '../../types'
import { GoogleGuard, JwtGuard, LocalGuard } from '../../protection/guards'
import { Response } from 'express'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants'
import { map, mergeMap } from 'rxjs'
import { HttpService } from '@nestjs/axios'
import { Provider } from '../../types/enums'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly httpService: HttpService
  ) {}

  @Post('register')
  async register(
    @Body() dto: RegisterUserDto,
    @UserAgent() userAgent: string,
    @Res() res: Response
  ): Promise<void> {
    const { email, password } = dto
    const tokens = await this.authService.register({
      email,
      password,
      userAgent
    })
    return await this.setTokensToResponse(tokens, res)
  }

  @Post('login')
  @UseGuards(LocalGuard)
  async login(
    @UserAgent() userAgent: string,
    @LocalAuthDecorator() user: User,
    @Res() res: Response
  ): Promise<void> {
    const tokens: Tokens = await this.authService.login({ user, userAgent })
    return await this.setTokensToResponse(tokens, res)
  }

  @Post('new-password')
  @UseGuards(JwtGuard)
  async newPassword(
    @Body() dto: NewPasswordDto,
    @JwtPayloadDecorator('userId') userId: string
  ): Promise<string> {
    const { id, oldPassword, newPassword } = dto
    return this.authService.newPassword({
      id,
      oldPassword,
      newPassword,
      userId
    })
  }

  @Get('google')
  @UseGuards(GoogleGuard)
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(GoogleGuard)
  async googleAuthCallback(
    @Res() res: Response,
    @GoogleUserDecorator('accessToken') accessToken: string
  ) {
    return res.redirect(
      `http://localhost:4200/api/auth/google/success?${ACCESS_TOKEN}=${accessToken}`
    )
  }

  @Get('google/success')
  async googleAuthSuccess(
    @Query(ACCESS_TOKEN) accessToken: string,
    @UserAgent() userAgent: string,
    @Res() res: Response
  ) {
    return this.httpService
      .get(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`
      )
      .pipe(
        mergeMap(({ data: { email } }) =>
          this.authService.providerAuth({
            email,
            userAgent,
            provider: Provider.GOOGLE
          })
        ),
        map((data) => this.setTokensToResponse(data, res))
      )
  }

  private async setTokensToResponse(
    tokens: Tokens,
    res: Response
  ): Promise<void> {
    res.cookie(REFRESH_TOKEN, tokens.refreshToken.token, {
      httpOnly: true,
      secure: false,
      sameSite: true,
      path: '/'
    })
    res.send({ accessToken: tokens.accessToken })
  }
}
