import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Comment } from 'src/comment/comment.entity';
import { MoviesWatched } from './movies-watched.entity';

@Entity('movie')
export class Movie {
  @ApiProperty({
    description: 'Movie ID',
    example: 1,
  })
  @PrimaryColumn()
  id: number;

  @ApiProperty({
    description: 'Movie Title',
    example: 'Men In Black',
  })
  @Column({ default: null })
  title: string | null;

  @ApiProperty({
    description: 'Movie Description',
    example:
      'Men In Black is a movie with one white man and one black man and aliens',
  })
  @Column({ default: null })
  description: string | null;

  @ApiProperty({
    description: 'Created time',
  })
  @CreateDateColumn()
  readonly createdAt: Date;

  @ApiProperty({
    description: 'Updated time',
  })
  @UpdateDateColumn()
  readonly updatedAt: Date;

  @ApiProperty({
    description: 'Deleted time',
  })
  @DeleteDateColumn()
  readonly deletedAt: Date | null;

  @OneToMany((type) => Comment, (comment) => comment.Movie)
  Comments: Comment[];

  @OneToMany((type) => MoviesWatched, (movieswatched) => movieswatched.Movie)
  MoviesWatched: MoviesWatched[];
}
