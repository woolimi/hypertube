import { User } from '../user/user.entity';
import { Movie } from '../movie/movie.entity';

export interface IComment {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  User: User;
  Movie: Movie;
}
