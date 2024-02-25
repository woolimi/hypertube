import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { CacheModule } from '@nestjs/cache-manager';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import { UserRepository } from 'src/user/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CacheModule.register({
      ttl: 15 * 60 * 1000, // 15min
      max: 100,
    }),
  ],
  controllers: [MovieController],
  providers: [
    MovieService,
    UserService,
    UserRepository,
    AuthService,
    JwtService,
  ],
})
export class MovieModule {}
