import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { Repository } from 'typeorm';
import fs from 'fs';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  async getUnwatchedMovieIds() {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const oldMovies = await this.movieRepository
      .createQueryBuilder('entity')
      .where('entity.watchedAt < :oneMonthAgo', { oneMonthAgo })
      .getMany();

    for (const movie of oldMovies) {
      fs.rmSync(`movies/${movie.id}`, { recursive: true, force: true });
      Logger.log(`Old movie deleted: ${movie.id}`);
    }
  }
}
