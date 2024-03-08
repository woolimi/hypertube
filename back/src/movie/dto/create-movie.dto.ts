import { PickType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { Movie } from '../movie.entity';

export class CreateMovieDto extends PickType(Movie, ['id']) {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
