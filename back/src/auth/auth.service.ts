import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import bcrypt from 'bcrypt';
import { Profile as GoogleProfile } from 'passport-google-oauth20';
import { Profile as GithubProfile } from 'passport-github2';
import randomstring from 'randomstring';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneByUsername(username);

    if (!user) return null;

    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  async validateGoogleUser(profile: GoogleProfile) {
    const { name, emails, photos, displayName, provider } = profile;
    const email = emails.filter((e) => e.verified)[0]?.value;

    if (!email) return null;
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      const _username = await this.createUsernameIfDuplicated(displayName);
      const newUser = await this.userService.create({
        firstName: name.givenName,
        lastName: name.familyName,
        username: _username,
        email,
        image: photos[0].value,
        provider,
        password: randomstring.generate(20),
        emailVerified: true,
      });
      return newUser;
    } else {
      return user;
    }
  }

  async validateGithubUser(profile: GithubProfile) {
    const { username, name, emails, photos, provider, displayName } = profile;
    const email = emails[0].value;
    const image = photos[0].value;

    if (!email) return null;
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      const _username = await this.createUsernameIfDuplicated(username);
      const [firstName, lastName] = displayName?.split(' ');
      const newUser = await this.userService.create({
        firstName: firstName || '',
        lastName: lastName || '',
        username: _username,
        email,
        image,
        provider,
        password: randomstring.generate(20),
        emailVerified: true,
      });
      return newUser;
    } else {
      return user;
    }
  }

  // 42 passport doesn't export Profile type...
  async validateFtUser(profile: GoogleProfile) {
    const { name, emails, _json, username, provider } = profile;
    const email = emails[0]?.value;
    const image = (_json as any).image.link;

    if (!email) return null;
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      const _username = await this.createUsernameIfDuplicated(username);
      const newUser = await this.userService.create({
        firstName: name.givenName,
        lastName: name.familyName,
        username: _username,
        email,
        image: image,
        provider: provider,
        password: randomstring.generate(20),
        emailVerified: true,
      });
      return newUser;
    } else {
      return user;
    }
  }

  async createUsernameIfDuplicated(username: string) {
    const isDuplicated = await this.userService.findOneByUsername(username);
    if (isDuplicated) {
      const suffix = randomstring.generate(4);
      return `${username}_${suffix}`;
    }
    return username;
  }

  getCookieWithJwtAccessToken(userId: string) {
    const payload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: `${this.getExpirationAccess()}s`,
    });

    return {
      accessToken: token,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * this.getExpirationAccess()),
    };
  }
  getCookieWithJwtRefreshToken(userId: string) {
    const payload = { userId };
    const expiration = this.getExpirationRefresh();
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: expiration,
    });
    return {
      refreshToken: token,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * expiration),
    };
  }

  private getExpirationAccess() {
    return parseInt(process.env.JWT_ACCESS_DURATION) * 60;
  }
  private getExpirationRefresh() {
    return parseInt(process.env.JWT_REFRESH_DURATION) * 60;
  }
}
