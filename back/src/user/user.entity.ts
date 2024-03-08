import {
  Entity,
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
    example: 'marvin1234',
    required: true,
  })
  @Column({ default: '' })
  password: string;

  @ApiProperty({
    description: 'Image url',
    example:
      'http://localhost:3005/images/avatar/386745e2-5333-4c2e-b088-02530f656351.png',
    required: true,
  })
  @Column({ default: '' })
  image: string;

  @Column({ default: false })
  emailVerified: boolean;

  @Column({ default: '' })
  refreshToken: string;

  @ApiProperty({
    description: 'Image url',
    enum: ['local', 'google', 'github', '42'],
  })
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
