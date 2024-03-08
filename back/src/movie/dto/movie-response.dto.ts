import { ApiProperty, PickType } from '@nestjs/swagger';
import { Movie } from 'src/movie/movie.entity';

export class MovieResponseDto extends PickType(Movie, [
  'id',
  'createdAt',
  'updatedAt',
  'deletedAt',
]) {
  id: number;

  @ApiProperty({ description: 'Is adult movie?', example: false })
  adult: boolean;

  @ApiProperty({
    description: 'Movie backdrop image',
    example: '/4woSOUD0equAYzvwhWBHIJDCM88.jpg',
  })
  backdrop_path: string;

  @ApiProperty({ description: 'Movie genre ids', example: [28, 27, 53] })
  genre_ids: number[];

  @ApiProperty({ description: 'Movie original language', example: 'en' })
  original_language: string;

  @ApiProperty({
    description: 'Movie original title',
    example: 'No Way Up',
  })
  original_title: string;

  @ApiProperty({
    description: 'Movie overview',
    example:
      "Characters from different backgrounds are thrown together when the plane they're travelling on crashes into the Pacific Ocean. A nightmare fight for survival ensues with the air supply running out and dangers creeping in from all sides.",
  })
  overview: string;

  @ApiProperty({
    description: 'Movie popularity',
    example: 1519.87,
  })
  popularity: number;

  @ApiProperty({
    description: 'Movie poster image',
    example: '/hu40Uxp9WtpL34jv3zyWLb5zEVY.jpg',
  })
  poster_path: string;

  @ApiProperty({
    description: 'Movie release date',
    example: '2022-10-12',
  })
  release_date: string;

  @ApiProperty({
    description: 'Movie title',
    example: 'No Way Up',
  })
  title: string;

  @ApiProperty({
    description: 'Movie vote average',
    example: 5.7,
  })
  vote_average: number;

  @ApiProperty({
    description: 'Movie vote count',
    example: 122,
  })
  vote_count: number;

  @ApiProperty({
    description: 'Is movie watched?',
    example: false,
  })
  is_watched: boolean;

  @ApiProperty({
    description: 'Movie genres',
    example: [{ id: 28, name: 'Action' }],
  })
  genres: Array<{ id: number; name: string }>;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
