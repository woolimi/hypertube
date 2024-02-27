import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/user.entity';
import { Comment } from 'src/comment/comment.entity';
import { Movie } from 'src/movie/movie.entity';
import { MovieService } from 'src/movie/movie.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Movie]), UserModule],
  providers: [CommentService, MovieService],
  controllers: [CommentController],
  exports: [CommentModule],
})
export class CommentModule {}
