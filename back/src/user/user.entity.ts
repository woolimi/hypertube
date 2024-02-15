import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
export class User {
  @ApiProperty({
    description: '유저 DB테이블 ID번호',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: '이름 (First Name)',
    example: 'marvin',
    required: true,
  })
  @Column({ type: 'varchar', name: 'lastName', length: 20, unique: true })
  firstName: string;

  @ApiProperty({
    description: '성 (Last Name)',
    example: 'gaye',
    required: true,
  })
  @Column({ type: 'varchar', name: 'firstName', length: 20, unique: true })
  lastName: string;

  // @ApiProperty({
  //   description: '유저 아이디',
  //   example: 'marvin',
  //   required: true,
  // })
  @Column({ type: 'varchar', name: 'username', length: 20, unique: true })
  username: string;

  @ApiProperty({
    description: '이메일 주소',
    example: 'marvin@student.42.fr',
    required: true,
  })
  @Column({ type: 'varchar', name: 'email', length: 40, unique: true })
  email: string;

  // @ApiProperty({
  //   description: '비밀번호',
  //   example: 'marvin',
  //   required: true,
  // })
  @Column({ type: 'varchar', name: 'firstName', length: 20, unique: true })
  password: string;
}
