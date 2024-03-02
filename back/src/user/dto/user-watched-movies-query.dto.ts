import { IsIn, IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class UserWatchedMoviesQueryDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  page: number;

  @IsOptional()
  @IsString()
  @IsIn(['en-US', 'fr-FR'])
  language: string;
}
