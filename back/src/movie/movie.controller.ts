import {
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MoviesQueryDto } from './dto/movies-query.dto';
import { MovieService } from './movie.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { MovieQueryDto } from './dto/movie-query.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('movies')
@UseInterceptors(CacheInterceptor)
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

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
  @UseGuards(JwtAuthGuard)
  async getMovie(@Param('movie_id') movie_id, @Query() query: MovieQueryDto) {
    try {
      const data = await this.movieService.getMovie(movie_id, query);
      const imdb_id = data.imdb_id;
      const torrents = await this.movieService.getMovieTorrent(imdb_id);

      return { ...data, torrents };
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException();
    }
  }
}
