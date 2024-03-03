import { Injectable } from '@nestjs/common';
import { MoviesWatched } from './movies-watched.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieService } from './movie.service';

@Injectable()
export class MoviesWatchedService {
  constructor(
    @InjectRepository(MoviesWatched)
    private readonly moviesWatchedRepository: Repository<MoviesWatched>,
    private readonly movieService: MovieService,
  ) {}

  async getUserWatchedMovies(userId: string, page: number, language: string) {
    const perPage = 5;
    const total = await this.moviesWatchedRepository.count({
      where: [{ userId }],
    });
    const movies = await this.moviesWatchedRepository.find({
      where: [{ userId }],
      order: { watchedAt: 'DESC' },
      skip: (page - 1) * perPage,
      take: perPage,
    });
    const moviesData = await Promise.all([
      ...movies.map((m) => this.movieService.getMovie(m.movieId, { language })),
    ]);
    return { movies: moviesData, total };
  }
}
