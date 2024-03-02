import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { Comment } from 'src/comment/comment.entity';
import { MoviesWatched } from 'src/movie/movies-watched.entity';
import { MoviesWatchedRepository } from 'src/movie/movies-watched.repository';
import { MoviesWatchedService } from 'src/movie/movies-watched.service';
import { MovieService } from 'src/movie/movie.service';
import { MovieRepository } from 'src/movie/movie.repository';
import { Movie } from 'src/movie/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Comment, Movie, MoviesWatched])],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    JwtService,
    MoviesWatchedRepository,
    MoviesWatchedService,
    MovieService,
    MovieRepository,
  ],
  exports: [UserService],
})
export class UserModule {}
