import {
  IsNotEmpty,
  IsEmail,
  Length,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @Length(2, 20)
  @IsOptional()
  firstName?: string;

  @IsNotEmpty()
  @Length(2, 20)
  @IsOptional()
  lastName?: string;

  @IsNotEmpty()
  @Length(2, 20)
  @IsOptional()
  username?: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(40)
  @IsOptional()
  email?: string;

  @IsNotEmpty()
  @Length(8, 40)
  @IsOptional()
  password?: string;

  @IsOptional()
  @IsOptional()
  image?: string;

  @IsOptional()
  @IsOptional()
  provider?: string;

  @IsOptional()
  @IsOptional()
  emailVerified?: boolean;
}
