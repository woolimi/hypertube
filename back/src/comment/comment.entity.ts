import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Relation,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { Movie } from '../movie/movie.entity';

@Entity('comment')
export class Comment {
  @ApiProperty({
    description: 'Comment ID',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Comment',
    example: 'This is comment',
  })
  @Column({ length: 300, nullable: false })
  content: string;

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

  @ManyToOne((type) => User, (user) => user.Comments, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  User: Relation<User>;

  @ManyToOne((type) => Movie, (movie) => movie.Comments, { eager: true })
  @JoinColumn({
    name: 'movie_id',
    referencedColumnName: 'id',
  })
  Movie: Relation<Movie>;
}
