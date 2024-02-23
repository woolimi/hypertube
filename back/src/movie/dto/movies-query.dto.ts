import { IsIn, IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class MoviesQueryDto {
  @IsInt()
  @IsPositive()
  page: number;

  @IsString()
  @IsIn(['en-US', 'fr-FR'])
  language: string;

  @IsString()
  @IsOptional()
  @IsIn([
    'title.asc',
    'title.desc',
    'popularity.asc',
    'popularity.desc',
    'primary_release_date.asc',
    'primary_release_date.desc',
  ])
  sort_by?: string;

  @IsString()
  @IsOptional()
  with_genres?: string; // ex) 12AND16

  @IsString()
  @IsOptional()
  with_keywords?: string;

  @IsString()
  @IsOptional()
  with_origin_country?: string;
}
