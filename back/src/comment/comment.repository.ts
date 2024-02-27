import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentRepository extends Repository<Comment> {
  async getAllComments(id: number): Promise<Comment[]> {
    return await this.createQueryBuilder('comment')
      .where('comment.movie_id=:id', {
        id,
      })
      .getMany();
  }
}
