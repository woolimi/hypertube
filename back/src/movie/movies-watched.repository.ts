import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { MoviesWatched } from './movies-watched.entity';

@Injectable()
export class MoviesWatchedRepository extends Repository<MoviesWatched> {}
