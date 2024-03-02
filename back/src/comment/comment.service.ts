import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { MovieService } from 'src/movie/movie.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly movieService: MovieService,
    private readonly userService: UserService,
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
    const { userId, movieId } = createCommentDto;
    Logger.log('create comment user id:', userId);
    const movie = await this.movieService.getMovieData(movieId);
    if (!movie) {
      await this.movieService.createMovieData(movieId);
    }
    const user = await this.userService.findOneById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    Logger.log('comment user:', user);
    const createDto = { ...createCommentDto, User: user, Movie: movie };
    const comment = this.commentRepository.create(createDto);
    this.movieService.addCommentToMovieData(movieId, comment);
    return await this.commentRepository.save(comment);
  }

  async updateComment(commentId: number, content: string) {
    const comment = await this.getComment(commentId);
    if (!comment) {
      throw new BadRequestException('Comment not found');
    }
    comment.content = content;
    const updatedComment = await this.commentRepository.save(comment);
    const movieId = comment.Movie.id;
    this.movieService.updateCommentFromMovieData(movieId, updatedComment);
    return updatedComment;
  }

  async deleteComment(commentId: number) {
    const comment = await this.getComment(commentId);
    if (!comment) {
      throw Error('Comment not found');
    }
    const movieId = comment.Movie.id;
    this.movieService.removeCommentFromMovieData(movieId, commentId);
    return await this.commentRepository.delete(commentId);
  }
}
