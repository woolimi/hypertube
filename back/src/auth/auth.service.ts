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
    const expire = parseInt(process.env.JWT_ACCESS_DURATION) * 60;
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: `${expire}s`,
    });
    return {
      accessToken: token,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * expire),
    };
  }
  getCookieWithJwtRefreshToken(userId: number) {
    const payload = { userId };
    const expire = parseInt(process.env.JWT_REFRESH_DURATION) * 60;
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: `${expire}s`,
    });
    return {
      refreshToken: token,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * expire),
    };
  }

  getCookiesForLogOut() {
    return [
      {
        accessOption: {
          domain: 'localhost',
          path: '/',
          httpOnly: true,
          expires: new Date(),
        },
        refreshOption: {
          domain: 'localhost',
          path: '/',
          httpOnly: true,
          expires: new Date(),
        },
      },
    ];
  }
}
