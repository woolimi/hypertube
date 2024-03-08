import { PickType } from '@nestjs/swagger';
import { MaxLength, IsNotEmpty, Length } from 'class-validator';
import { Comment } from '../comment.entity';

export class CommentLengthDto extends PickType(Comment, ['content']) {
  @IsNotEmpty()
  @MaxLength(300, { message: 'Text length must be at most 300 characters' })
  @Length(1, 300)
  content: string;
}
