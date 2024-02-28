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
  search: string;

}
