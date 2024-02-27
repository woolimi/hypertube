import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { CacheModule } from '@nestjs/cache-manager';
import { CommentRepository } from '../comment/comment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from '../comment/comment.service';
import { Comment } from '../comment/comment.entity';
import { Movie } from './movie.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, Movie]),
    CacheModule.register({
      ttl: 15 * 60 * 1000, // 15min
      max: 100,
    }),
  ],
  controllers: [MovieController],
  providers: [MovieService, CommentService],
})
export class MovieModule {}
