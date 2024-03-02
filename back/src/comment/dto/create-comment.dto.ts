import { MaxLength, IsNotEmpty, Length } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  movieId: number;

  @IsNotEmpty()
  @MaxLength(150, { message: 'Text length must be at most 150 characters' })
  @Length(1, 150)
  content: string;
}
