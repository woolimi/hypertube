import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { TorrentService } from './torrent.service';
import { UserRepository } from 'src/user/user.repository';
import { User } from 'src/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie, User]),
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
    TorrentService,
  ],
  exports: [MovieService],
})
export class MovieModule {}
