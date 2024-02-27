import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MoviesQueryDto } from './dto/movies-query.dto';
import { MovieService } from './movie.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { MovieQueryDto } from './dto/movie-query.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommentService } from '../comment/comment.service';
import { Comment } from '../comment/comment.entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiTags('Movies')
@Controller('movies')
@UseInterceptors(CacheInterceptor)
export class MovieController {
  constructor(
    private readonly movieService: MovieService,
    private readonly commentService: CommentService,
  ) {}

  @Get('/')
  async getMovies(
    @Query()
    query: MoviesQueryDto,
  ) {
    try {
      return await this.movieService.getMovies(query);
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  @Get('/:movie_id')
  async getMovie(@Param('movie_id') movie_id, @Query() query: MovieQueryDto) {
    try {
      const movie = this.movieService.getMovie(movie_id, query);
      const movieData = this.movieService.getCommentsForMovie(movie_id);
      return movie;
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'create comments' })
  @UseGuards(JwtAuthGuard)
  @Post('/:id/comments/create')
  async createComment(
    @Req() req,
    @Body('content') content: string,
    @Param('id') movieId: number,
  ) {
    const userId = req.user.id;
    const createCommentDto = { userId, movieId, content };
    this.commentService.createComment(createCommentDto);
  }
}
