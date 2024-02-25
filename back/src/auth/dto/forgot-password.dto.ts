import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/user/user.entity';

export class ForgotPasswordDto extends PickType(User, [
  'username',
  'email',
] as const) {
  @ApiProperty({
    description: 'username of user',
    example: 'marvin',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'email of user',
    example: 'marvin@student.42.fr',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
