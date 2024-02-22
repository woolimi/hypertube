import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { MoviesQueryDto } from './dto/movies-query.dto';

@Injectable()
export class MovieService {
  private tmdb: AxiosInstance;
  constructor() {
    this.tmdb = axios.create({
      baseURL: 'https://api.themoviedb.org/3',
      headers: {
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      },
    });
  }

  async getTopRated(query: MoviesQueryDto) {
    query.page = query.page || 1;
    query.language = query.language || 'en-US';

    return await this.tmdb.get('/discover/movie', {
      params: {
        include_adult: false,
        include_video: false,
        sort_by: 'popularity.desc',
        ...query,
      },
    });
  }
}
