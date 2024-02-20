import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Comment } from 'src/comment/comment.entity';
import { MoviesWatched } from 'src/movie/movies-watched.entity';
@Entity('user')
export class User {
  @ApiProperty({
    description: 'User ID',
    example: '703fe062-b7d0-48a3-a0a5-baa7ab833047',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'First Name',
    example: 'marvin',
  })
  @Column({ default: '' })
  firstName: string;

  @ApiProperty({
    description: 'Last Name',
    example: 'gaye',
    required: true,
  })
  @Column({ default: '' })
  lastName: string;

  @ApiProperty({
    description: 'Username',
    example: 'marvin',
    required: true,
  })
  @Column({ unique: true, default: '' })
  username: string;

  @ApiProperty({
    description: 'Email address',
    example: 'marvin@student.42.fr',
    required: true,
  })
  @Column({ unique: true, default: '' })
  email: string;

  @ApiProperty({
    description: 'Password',
    example: 'marvin',
    required: true,
  })
  @Column({ default: '' })
  password: string;

  @Column({ default: '' })
  image: string;

  @Column({ default: false })
  emailVerified: boolean;

  @Column({ default: '' })
  refreshToken: string;

  @Column({ default: 'local' })
  provider: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany((type) => Comment, (comment) => comment.User)
  Comments: Comment[];

  @OneToMany((type) => MoviesWatched, (movieswatched) => movieswatched.User)
  MoviesWatched: MoviesWatched[];
}
