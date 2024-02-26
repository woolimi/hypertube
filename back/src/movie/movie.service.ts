import { Injectable, Logger, UseGuards } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { MoviesQueryDto } from './dto/movies-query.dto';
import { MovieQueryDto } from './dto/movie-query.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Injectable()
export class MovieService {
  private tmdb: AxiosInstance;
  private readonly Genre = {
    '12': {
      'en-US': 'Adventure',
      'fr-FR': 'Aventure',
    },
    '14': {
      'en-US': 'Fantasy',
      'fr-FR': 'Fantastique',
    },
    '16': {
      'en-US': 'Animation',
      'fr-FR': 'Animation',
    },
    '18': {
      'en-US': 'Drama',
      'fr-FR': 'Drame',
    },
    '27': { 'en-US': 'Horror', 'fr-FR': 'Horreur' },
    '28': {
      'en-US': 'Action',
      'fr-FR': 'Action',
    },
    '35': {
      'en-US': 'Comedy',
      'fr-FR': 'Comédie',
    },
    '36': {
      'en-US': 'History',
      'fr-FR': 'Histoire',
    },
    '37': {
      'en-US': 'Western',
      'fr-FR': 'Western',
    },
    '53': {
      'en-US': 'Thriller',
      'fr-FR': 'Thriller',
    },
    '80': {
      'en-US': 'Crime',
      'fr-FR': 'Crime',
    },
    '99': {
      'en-US': 'Documentary',
      'fr-FR': 'Documentaire',
    },
    '878': {
      'en-US': 'Science Fiction',
      'fr-FR': 'Science-fiction',
    },
    '9648': {
      'en-US': 'Mystery',
      'fr-FR': 'Mystère',
    },
    '10402': {
      'en-US': 'Music',
      'fr-FR': 'Musique',
    },
    '10749': {
      'en-US': 'Romance',
      'fr-FR': 'Romance',
    },
    '10751': {
      'en-US': 'Family',
      'fr-FR': 'Familial',
    },
    '10752': {
      'en-US': 'War',
      'fr-FR': 'Guerre',
    },
    '10770': {
      'en-US': 'TV Movie',
      'fr-FR': 'Téléfilm',
    },
  };
  constructor() {
    this.tmdb = axios.create({
      baseURL: 'https://api.themoviedb.org/3',
      headers: {
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      },
    });
  }

  async getMovies(query: MoviesQueryDto) {
    query.page = query.page || 1;
    query.language = query.language || 'en-US';
    query.sort_by = query.sort_by || 'popularity.desc';

    const { data } = await this.tmdb.get('/discover/movie', {
      params: {
        include_adult: false,
        include_video: false,
        ...query,
      },
    });
    const results = data.results;
    results.forEach((movie) => {
      movie.genres = movie.genre_ids?.map((id) => ({
        id: id,
        name: this.Genre[id][query.language],
      }));
      movie.vote_average = Number(movie.vote_average).toFixed(1);
    });
    return { ...data, results };
  }

  @UseGuards(JwtAuthGuard)
  async getMovie(movie_id, query: MovieQueryDto) {
    query.language = query.language || 'en-US';

    const { data } = await this.tmdb.get(`/movie/${movie_id}`, {
      params: {
        ...query,
      },
    });
    data.vote_average = Number(data.vote_average).toFixed(1);
    return data;
  }
}
