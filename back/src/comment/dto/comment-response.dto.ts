import { ApiProperty, PickType } from '@nestjs/swagger';
import { MaxLength, IsNotEmpty, Length } from 'class-validator';
import { Comment } from '../comment.entity';
import { User } from 'src/user/user.entity';
import { Movie } from 'src/movie/movie.entity';

export class CommentResponseDto extends PickType(Comment, [
  'id',
  'content',
  'User',
  'createdAt',
  'updatedAt',
  'deletedAt',
]) {
  @ApiProperty({
    description: 'User',
    example: {
      id: '5f9c3e6f-7b7c-4b9b-8b8b-8b8b8b8b8b8b',
      username: 'marvin',
      image:
        'http://localhost:3005/images/avatar/386745e2-5333-4c2e-b088-02530f656351.png',
    },
  })
  User: User;

  @ApiProperty({
    description: 'Movie',
    example: {
      id: 62320,
      createdAt: '2024-03-08T07:55:37.616Z',
      updatedAt: '2024-03-08T07:55:37.616Z',
      watchedAt: null,
      deletedAt: null,
    },
  })
  Movie: Movie;

  @IsNotEmpty()
  @MaxLength(300, { message: 'Text length must be at most 300 characters' })
  @Length(1, 300)
  content: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
