import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // signIn (userId: number) {
  //   username
  // }

  getCookieWithJwtAccessToken(userId: number) {
    const payload = { userId };
    const expire = parseInt(process.env.JWT_ACCESS_DURATION) * 1000 * 60;
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: `${expire}s`,
    });
    return {
      accessToken: token,
      domain: 'localhost',
      path: '/',
      // httpOnly: true,
      maxAge: expire,
    };
  }
  getCookieWithJwtRefreshToken(userId: number) {
    const payload = { userId };
    const expire = parseInt(process.env.JWT_REFRESH_DURATION) * 1000 * 60;
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: `${expire}s`,
    });
    return {
      refreshToken: token,
      domain: 'localhost',
      path: '/',
      // httpOnly: true,
      maxAge: expire,
    };
  }

  getCookiesForLogOut() {
    return [
      {
        accessOption: {
          domain: 'localhost',
          path: '/',
          // httpOnly: true,
          maxAge: 0,
        },
        refreshOption: {
          domain: 'localhost',
          path: '/',
          // httpOnly: true,
          maxAge: 0,
        },
      },
    ];
  }
}
