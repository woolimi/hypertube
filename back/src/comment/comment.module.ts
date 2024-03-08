import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/comment/comment.entity';
import { MovieService } from 'src/movie/movie.service';
import { Movie } from 'src/movie/movie.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { MoviesWatchedRepository } from 'src/movie/movies-watched.repository';
import { MoviesWatched } from 'src/movie/movies-watched.entity';
import { MovieRepository } from 'src/movie/movie.repository';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Movie, User, MoviesWatched])],
  providers: [
    CommentService,
    MovieService,
    UserService,
    MoviesWatchedRepository,
    MovieRepository,
    UserRepository,
  ],
  controllers: [CommentController],
})
export class CommentModule {}
