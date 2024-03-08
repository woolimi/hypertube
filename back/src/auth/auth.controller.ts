import {
  Controller,
  Request,
  Post,
  Response,
  UseGuards,
  UnauthorizedException,
  Body,
  Get,
  Query,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { GoogleAuthGuard } from 'src/guards/google-auth.guard';
import { FtAuthGuard } from 'src/guards/ft-auth.guard';
import { GithubAuthGuard } from 'src/guards/github-auth.guard';
import { EmailService } from './email.service';
import { JwtService } from '@nestjs/jwt';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiProperty,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private emailService: EmailService,
    private jwtService: JwtService,
  ) {}

  @ApiOperation({
    summary: 'Login',
    description: 'Login user and return user info with access token',
  })
  @ApiBody({ type: LoginUserDto })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Response({ passthrough: true }) res) {
    const userId = req.user.id;

    const { accessToken, ...accessOption } =
      this.authService.getCookieWithJwtAccessToken(userId);
    const { refreshToken, ...refreshOption } =
      this.authService.getCookieWithJwtRefreshToken(userId);

    res.cookie('accessToken', accessToken, accessOption);
    res.cookie('refreshToken', refreshToken, refreshOption);
    res.status(200);
    await this.userService.saveRefreshToken(userId, refreshToken);
    return { ...req.user, accessToken };
  }

  @ApiOperation({
    summary: 'Logout',
    description: 'Logout user and delete token from cookie',
  })
  @Post('/logout')
  async logout(@Request() req, @Response({ passthrough: true }) res) {
    const option = {
      domain: process.env.DOMAIN,
      path: '/',
      httpOnly: true,
      expires: new Date(),
    };
    res.cookie('refreshToken', '', option);
    res.cookie('accessToken', '', option);

    const accessToken = req.cookies['accessToken'];
    if (!accessToken) return {};

    const payload = this.jwtService.verify(accessToken, {
      secret: process.env.JWT_SECRET,
    });
    await this.userService.saveRefreshToken(payload.userId, '');
    return {};
  }

  @ApiOperation({
    summary: 'Register endpoint',
    description:
      'Register user and return user info with access token and refresh token',
  })
  @ApiProperty({ type: CreateUserDto })
  @ApiQuery({ name: 'lang', enum: ['en', 'fr'], required: false })
  @Post('/register')
  async register(
    @Body() user: CreateUserDto,
    @Response({ passthrough: true }) res,
    @Query('lang') lang,
  ) {
    const createdUser = await this.userService.create(user);

    const { accessToken, ...accessOption } =
      this.authService.getCookieWithJwtAccessToken(createdUser.id);
    const { refreshToken, ...refreshOption } =
      this.authService.getCookieWithJwtRefreshToken(createdUser.id);
    res.cookie('accessToken', accessToken, accessOption);
    res.cookie('refreshToken', refreshToken, refreshOption);
    await this.userService.saveRefreshToken(createdUser.id, refreshToken);

    delete createdUser.refreshToken;
    delete createdUser.password;

    // Send email confirmation email
    lang = ['en', 'fr'].includes(lang) ? lang : 'en';
    await this.emailService.sendVerifyEmail(
      { id: createdUser.id, email: createdUser.email },
      lang,
    );

    return { ...createdUser, accessToken };
  }

  @ApiOperation({
    summary: 'Refresh token',
    description:
      'Refresh access token and return user info with refreshed access token. It will create access token and refresh token in cookie (http only).',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/refresh')
  async refresh(@Request() req, @Response({ passthrough: true }) res) {
    Logger.log('Refresh token called');
    const oldRefreshToken = req.cookies['refreshToken'];
    const option = {
      domain: process.env.DOMAIN,
      path: '/',
      httpOnly: true,
      expires: new Date(),
    };

    if (!oldRefreshToken) {
      Logger.error('No refresh token');
      res.cookie('accessToken', '', option);
      res.cookie('refreshToken', '', option);
      throw new UnauthorizedException();
    }

    // TODO: Check why front call refreshTokenServer two times
    // const { refreshToken: dbOldRefreshToken } =
    //   await this.userService.findOneById(req.user.userId);

    // if (!oldRefreshToken || dbOldRefreshToken !== oldRefreshToken) {
    //   Logger.error('Invalid refresh token');
    //   res.cookie('accessToken', '', option);
    //   res.cookie('refreshToken', '', option);
    //   throw new UnauthorizedException();
    // }

    const userId = req.user.userId;
    const { accessToken, ...accessOption } =
      this.authService.getCookieWithJwtAccessToken(userId);
    const { refreshToken, ...refreshOption } =
      this.authService.getCookieWithJwtRefreshToken(userId);

    // Update tokens
    res.cookie('accessToken', accessToken, accessOption);
    res.cookie('refreshToken', refreshToken, refreshOption);
    await this.userService.saveRefreshToken(userId, refreshToken);
    const userData = await this.userService.findOneById(userId, true);

    return { ...userData, accessToken };
  }

  @ApiOperation({
    summary: 'Email verification endpoint',
    description:
      'Verify email address from the link user clicked in email. Send token in query and redirect to email verification page',
  })
  @ApiQuery({
    name: 'token',
    type: String,
  })
  @ApiQuery({
    name: 'lang',
    enum: ['en', 'fr'],
    required: false,
  })
  @Get('/verify-email')
  async verifyEmail(
    @Query('token') token,
    @Query('lang') lang,
    @Response({ passthrough: true }) res,
  ) {
    lang = ['en', 'fr'].includes(lang) ? lang : 'en';
    const payload = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
    const user = await this.userService.findOneById(payload.userId);
    await this.userService.update(user.id, { emailVerified: true });

    res.redirect(`${process.env.FRONT_HOST}/${lang}/auth/email-confirmed`);
  }

  @ApiOperation({
    summary: 'Forgot password endpoint',
    description:
      'Send email to user to reset password. Send username or email in query and redirect to forgot password page',
  })
  @ApiQuery({
    name: 'lang',
    enum: ['en', 'fr'],
    required: false,
  })
  @ApiProperty({ type: ForgotPasswordDto })
  @Post('/forgot-password')
  async forgotPasswordFindUser(
    @Query('lang') lang,
    @Body()
    userInfo: ForgotPasswordDto,
  ) {
    try {
      const foundEmail = await this.userService.findOneByEmail(userInfo.email);
      const foundUsername = await this.userService.findOneByUsername(
        userInfo.username,
      );
      if (!foundEmail || !foundUsername) {
        throw new BadRequestException({ code: 'INVALID_USER_CREDENTIALS' });
      } else if (!(foundEmail.id === foundUsername.id)) {
        throw new BadRequestException({ code: 'INVALID_USER_CREDENTIALS' });
      }

      // Send email confirmation email
      await this.emailService.sendPasswordResetEmail(
        { id: foundEmail.id, email: foundEmail.email },
        lang || 'en',
      );
      return;
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({
    summary: 'Reset password',
    description:
      'Verify reset password from the link user clicked in email. Send token in query and redirect to reset password page. User will be able to change password with new one',
  })
  @ApiQuery({
    name: 'token',
    type: String,
  })
  @ApiQuery({
    name: 'lang',
    enum: ['en', 'fr'],
    required: false,
  })
  @Get('/reset-password')
  async resetPassword(
    @Query('token') token,
    @Query('lang') lang,
    @Response({ passthrough: true }) res,
  ) {
    lang = ['en', 'fr'].includes(lang) ? lang : 'en';
    const payload = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
    const user = await this.userService.findOneById(payload.userId);
    //TODO: save tokens into DB
    // await this.userService.update(user.id, { ...user, emailVerified: true });

    const userId = payload.userId;
    const { accessToken, ...accessOption } =
      this.authService.getCookieWithJwtAccessToken(userId);
    const { refreshToken, ...refreshOption } =
      this.authService.getCookieWithJwtRefreshToken(userId);

    // Update tokens
    res.cookie('accessToken', accessToken, accessOption);
    res.cookie('refreshToken', refreshToken, refreshOption);
    await this.userService.saveRefreshToken(userId, refreshToken);

    res.redirect(
      `${process.env.FRONT_HOST}/${lang}/auth/password-email-change`,
    );
  }

  @ApiOperation({
    summary: 'Google Oauth login endpoint',
  })
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {}

  @ApiOperation({
    summary: 'Google Oauth login redirect endpoint',
  })
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Request() req, @Response({ passthrough: true }) res) {
    this.login(req, res);
    res.redirect(process.env.FRONT_HOST);
  }

  @ApiOperation({
    summary: '42 login endpoint',
  })
  @Get('ft/login')
  @UseGuards(FtAuthGuard)
  async ftLogin() {}

  @ApiOperation({
    summary: '42 login redirect endpoint',
  })
  @Get('ft/redirect')
  @UseGuards(FtAuthGuard)
  async ftCallback(@Request() req, @Response({ passthrough: true }) res) {
    this.login(req, res);
    res.redirect(process.env.FRONT_HOST);
  }

  @ApiOperation({
    summary: 'Github login endpoint',
  })
  @Get('github/login')
  @UseGuards(GithubAuthGuard)
  async githubLogin() {}

  @ApiOperation({
    summary: 'Github login redirect endpoint',
  })
  @Get('github/redirect')
  @UseGuards(GithubAuthGuard)
  async githubCallback(@Request() req, @Response({ passthrough: true }) res) {
    this.login(req, res);
    res.redirect(process.env.FRONT_HOST);
  }
}
