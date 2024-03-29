import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from '../user/user.entity';
import { Movie } from '../movie/movie.entity';

@Entity('movieswatched')
@Index(['movieId', 'userId'], { unique: true })
export class MoviesWatched {
  @Column('int', { primary: true, name: 'movie_id' })
  movieId: number;

  @Column({ type: 'uuid', primary: true, name: 'user_id' })
  userId: string;

  @Column()
  watchedAt: Date;

  @ManyToOne((type) => User, (user) => user.MoviesWatched, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  User: User;

  @ManyToOne((type) => Movie, (movie) => movie.MoviesWatched, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'movie_id',
    referencedColumnName: 'id',
  })
  Movie: Movie;
}
