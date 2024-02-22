import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
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
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Movie Title',
    example: 'Men In Black',
  })
  @Column()
  title: string;

  @ApiProperty({
    description: 'Movie Description',
    example:
      'Men In Black is a movie with one white man and one black man and aliens',
  })
  @Column()
  description: string;

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
