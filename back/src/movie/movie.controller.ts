import {
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { MoviesQueryDto } from './dto/movies-query.dto';
import { MovieService } from './movie.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('movies')
@UseInterceptors(CacheInterceptor)
export class MovieController {
  private Genre = {
    '12': 'Adventure',
    '14': 'Fantasy',
    '16': 'Animation',
    '18': 'Drama',
    '27': 'Horror',
    '28': 'Action',
    '35': 'Comedy',
    '36': 'History',
    '37': 'Western',
    '53': 'Thriller',
    '80': 'Crime',
    '99': 'Documentary',
    '878': 'Science Fiction',
    '9648': 'Mystery',
    '10402': 'Music',
    '10749': 'Romance',
    '10751': 'Family',
    '10752': 'War',
    '10770': 'TV Movie',
  };
  constructor(private readonly movieService: MovieService) {}

  @Get('/')
  async getMovies(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query: MoviesQueryDto,
  ) {
    try {
      const { data } = await this.movieService.getTopRated(query);
      const { results } = data;

      results.forEach((movie) => {
        movie.genre_ids = movie.genre_ids.map((id) => ({
          id: id,
          name: this.Genre[id],
        }));
        movie.vote_average = Number(movie.vote_average).toFixed(1);
      });

      return { ...data, results };
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException();
    }
  }
}
