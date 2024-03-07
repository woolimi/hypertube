import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEmail,
  Length,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'First Name',
    example: 'marvin',
  })
  @IsNotEmpty()
  @Length(2, 20)
  @IsOptional()
  firstName?: string;

  @ApiProperty({
    description: 'Last Name',
    example: 'gaye',
  })
  @IsNotEmpty()
  @Length(2, 20)
  @IsOptional()
  lastName?: string;

  @ApiProperty({
    description: 'Username',
    example: 'marvin',
  })
  @IsNotEmpty()
  @Length(2, 20)
  @IsOptional()
  username?: string;

  @ApiProperty({
    description: 'Email address',
    example: 'marvin@student.42.fr',
  })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(40)
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Password',
    example: 'marvin1234',
  })
  @IsNotEmpty()
  @Length(8, 40)
  @IsOptional()
  password?: string;

  @ApiProperty({
    description: 'Image url',
    example:
      'http://localhost:3005/images/avatar/386745e2-5333-4c2e-b088-02530f656351.png',
  })
  @IsOptional()
  @IsOptional()
  image?: string;

  @ApiProperty({
    description: 'Image url',
    enum: ['local', 'google', 'github', '42'],
  })
  @IsOptional()
  @IsOptional()
  provider?: string;

  @ApiProperty({
    description: 'Email verified',
    example: true,
  })
  @IsOptional()
  @IsOptional()
  emailVerified?: boolean;
}
