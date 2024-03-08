import { ApiProperty, PickType } from '@nestjs/swagger';
import { Movie } from 'src/movie/movie.entity';
import { MovieResponseDto } from './movie-response.dto';

export class MoviesResponseDto extends PickType(Movie, [
  'id',
  'createdAt',
  'updatedAt',
  'deletedAt',
]) {
  @ApiProperty({ description: 'Page', example: 1 })
  page: number;

  @ApiProperty({ description: 'Total Pages', example: 42863 })
  total_pages: number;

  @ApiProperty({ description: 'Total Results', example: 857258 })
  total_results: number;

  @ApiProperty({
    description: 'Results',
    type: MovieResponseDto,
    isArray: true,
  })
  results: MovieResponseDto[];
}
