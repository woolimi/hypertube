import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { GoogleStrategy } from 'src/auth/strategies/google.strategy';
import { FtStrategy } from 'src/auth/strategies/ft.strategy';
import { GithubStrategy } from 'src/auth/strategies/github.strategy';
import { EmailService } from './email.service';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    FtStrategy,
    GithubStrategy,
    EmailService,
  ],
  exports: [],
})
export class AuthModule {}
