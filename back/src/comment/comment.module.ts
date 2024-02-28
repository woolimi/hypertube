import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/comment/comment.entity';
import { MovieService } from 'src/movie/movie.service';
import { Movie } from 'src/movie/movie.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Movie, User])],
  providers: [CommentService, MovieService, UserService],
  controllers: [CommentController],
})
export class CommentModule {}
