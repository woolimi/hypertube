import { IsIn, IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class MoviesQueryDto {
  @IsInt()
  @IsPositive()
  @IsOptional()
  page?: number;

  @IsString()
  @IsIn(['en-US', 'fr-FR'])
  @IsOptional()
  language?: string;

  @IsString()
  @IsOptional()
  search?: string;
}
