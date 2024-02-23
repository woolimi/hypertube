import { IsIn, IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class MovieQueryDto {
  @IsString()
  @IsIn(['en-US', 'fr-FR'])
  language: string;
}
