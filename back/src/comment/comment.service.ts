import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { MovieService } from 'src/movie/movie.service';
import { UserService } from 'src/user/user.service';
import { Movie } from 'src/movie/movie.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Movie)
    private readonly userRepository: Repository<User>,
    private readonly movieService: MovieService,
    private readonly userService: UserService,
    private readonly connection: DataSource,
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
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { userId, movieId } = createCommentDto;
      let movie = await queryRunner.manager
        .getRepository(Movie)
        .findOneBy({ id: movieId });

      if (!movie) {
        movie = await queryRunner.manager
          .getRepository(Movie)
          .save({ id: movieId });
      }

      const user = await queryRunner.manager
        .getRepository(User)
        .findOneBy({ id: userId });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const modifiedUser = {
        id: user.id,
        username: user.username,
        image: user.image,
      };
      const createDto = {
        ...createCommentDto,
        User: modifiedUser,
        Movie: movie,
      };
      const comment = await queryRunner.manager
        .getRepository(Comment)
        .save(createDto);
      await queryRunner.commitTransaction();
      return comment;
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async updateComment(commentId: number, authorId: string, content: string) {
    const comment = await this.getComment(commentId);
    if (!comment) {
      throw new BadRequestException('Comment not found');
    }
    if (comment.User.id !== authorId) {
      throw new UnauthorizedException('User not authorized');
    }
    comment.content = content;
    return await this.commentRepository.save(comment);
  }

  async deleteComment(commentId: number, authorId: string) {
    const comment = await this.getComment(commentId);
    if (!comment) {
      throw Error('Comment not found');
    }
    if (comment.User.id !== authorId) {
      throw new UnauthorizedException('User not authorized');
    }
    await this.commentRepository.delete(commentId);
    return comment;
  }
}
