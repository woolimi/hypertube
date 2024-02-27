import { IsNotEmpty, Length } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  movieId: number;

  @IsNotEmpty()
  @Length(2, 200)
  content: string;
}
