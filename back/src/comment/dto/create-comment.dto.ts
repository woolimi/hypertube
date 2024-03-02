import { MaxLength, IsNotEmpty, Length } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  movieId: number;

  @IsNotEmpty()
  @MaxLength(300, { message: 'Text length must be at most 300 characters' })
  @Length(1, 300)
  content: string;
}
