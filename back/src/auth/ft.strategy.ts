import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-42';
import { AuthService } from './auth.service';
import type { Profile } from 'passport-google-oauth20';

@Injectable()
export class FtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.FT_CLIENT_ID,
      clientSecret: process.env.FT_CLIENT_SECRET,
      callbackURL: process.env.FT_CALLBACK_URL,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    // console.log(profile);
    const user = await this.authService.validateFtUser(profile);

    return user;
  }
}
