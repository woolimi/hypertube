import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      ttl: 15 * 60 * 1000, // 15min
      max: 100,
    }),
  ],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
