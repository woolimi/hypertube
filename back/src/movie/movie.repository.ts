import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Movie } from './movie.entity';

@Injectable()
export class MovieRepository extends Repository<Movie> {}
