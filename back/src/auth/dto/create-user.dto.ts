import { PickType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEmail,
  Length,
  MaxLength,
  IsOptional,
  IsString,
} from 'class-validator';
import { User } from 'src/user/user.entity';

export class CreateUserDto extends PickType(User, [
  'firstName',
  'lastName',
  'username',
  'email',
  'password',
] as const) {
  @IsNotEmpty()
  @Length(2, 20)
  firstName: string;

  @IsNotEmpty()
  @Length(2, 20)
  lastName: string;

  @IsNotEmpty()
  @Length(2, 20)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(40)
  email: string;

  @IsNotEmpty()
  @Length(8, 20)
  password: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  provider: string;

  @IsOptional()
  emailVerified: boolean;
}
