import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-google-oauth20'
import { GoogleAuthUser } from '../../types'

export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID:
        '812474548940-2jijqi3jm48pi2k375acpohdi56uuguo.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:4200/api/auth/google/callback',
      scope: ['email', 'profile']
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string | null,
    profile: Profile,
    done: any
  ): Promise<any> {
    const { name, emails, photos } = profile
    const user: GoogleAuthUser = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      photo: photos[0].value,
      accessToken
    }
    done(null, user)
  }
}
