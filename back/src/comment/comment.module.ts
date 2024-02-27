import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/comment/comment.entity';
import { MovieService } from 'src/movie/movie.service';
import { Movie } from 'src/movie/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Movie])],
  providers: [CommentService, MovieService],
  controllers: [CommentController],
})
export class CommentModule {}
