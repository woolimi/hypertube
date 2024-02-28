import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { MovieService } from 'src/movie/movie.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly movieService: MovieService,
  ) {}

  async getCommentsForMovie(movieId: number): Promise<Comment[]> {
    const movie = await this.movieService.getMovieData(movieId);
    if (!movie) {
      return null;
    }
    return movie.Comments;
  }

  async getComment(commentId: number): Promise<Comment> {
    return await this.commentRepository.findOne({
      where: {
        id: commentId,
      },
    });
  }

  async createComment(createCommentDto: CreateCommentDto) {
    const { userId, movieId, content } = createCommentDto;
    const movie = await this.movieService.getMovieData(movieId);
    if (!movie) {
      await this.movieService.createMovieData(movieId);
    }
    const comment = this.commentRepository.create(createCommentDto);
    this.movieService.addCommentToMovieData(movieId, comment);
    return await this.commentRepository.save(comment);
  }

  async updateComment(commentId: number, content: string) {
    const comment = this.getComment(commentId);
    if (!comment) {
      throw Error('Comment not found');
    }
    const updatedComment = await this.commentRepository.save({
      ...comment,
      content,
    });
    const movieId = (await comment).Movie.id;
    this.movieService.updateCommentFromMovieData(movieId, updatedComment);
    return updatedComment;
  }

  async deleteComment(commentId: number) {
    const comment = this.getComment(commentId);
    if (!comment) {
      throw Error('Comment not found');
    }
    const movieId = (await comment).Movie.id;
    this.movieService.removeCommentFromMovieData(movieId, commentId);
    return await this.commentRepository.delete(commentId);
  }
}
