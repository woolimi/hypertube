import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

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
    required: true,
  })
  @Column()
  firstName: string;

  @ApiProperty({
    description: 'Last Name',
    example: 'gaye',
    required: true,
  })
  @Column()
  lastName: string;

  @ApiProperty({
    description: 'Username',
    example: 'marvin',
    required: true,
  })
  @Column({ unique: true })
  username: string;

  @ApiProperty({
    description: 'Email address',
    example: 'marvin@student.42.fr',
    required: true,
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    description: 'Password',
    example: 'marvin',
    required: true,
  })
  @Column()
  password: string;

  @Column({ default: false })
  emailVerified: boolean;

  @Column({ default: '' })
  refreshToken: string;
}
