import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Movie } from 'src/movie/movie.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async getCommentsForMovie(movieId: number): Promise<Comment[]> {
    const movie = await this.movieRepository.findOne({
      where: {
        id: movieId,
      },
      relations: ['Comments'],
    });
    if (!movie) {
      return null;
    }
    console.log('movie data:', movie);
    return movie.Comments;
  }

  async createComment(createCommentDto: CreateCommentDto) {
    const { userId, movieId, content } = createCommentDto;
    const movie = await this.movieRepository.findOne({
      where: {
        id: movieId,
      },
    });
    if (!movie) {
      const createMovieDto = { id: movieId };
      const movie = this.movieRepository.create(createMovieDto);
      await this.movieRepository.save(movie);
    }
    const comment = this.commentRepository.create(createCommentDto);
    movie.Comments.push(comment);
    await this.movieRepository.save(movie);
    return await this.commentRepository.save(comment);
  }
}
