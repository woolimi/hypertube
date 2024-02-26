import {
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  Param,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { MoviesQueryDto } from './dto/movies-query.dto';
import { MovieService } from './movie.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { MovieQueryDto } from './dto/movie-query.dto';

@Controller('movies')
@UseInterceptors(CacheInterceptor)
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('/')
  async getMovies(
    @Query()
    query: MoviesQueryDto,
  ) {
    console.log(query);
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
      return this.movieService.getMovie(movie_id, query);
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException();
    }
  }
}
