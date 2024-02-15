import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UserController {
  constructor(
    private authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  //TODO: to change using dto maybe?
  async create(
    @Body() user: User,
    @Res({ passthrough: true }) res,
  ): Promise<void> {
    const createdUser = await this.userService.create(user);
    const { accessToken, ...accessOption } =
      this.authService.getCookieWithJwtAccessToken(createdUser.id);
    const { refreshToken, ...refreshOption } =
      this.authService.getCookieWithJwtRefreshToken(createdUser.id);

    res.cookie('accessToken', accessToken, accessOption);
    res.cookie('refreshToken', refreshToken, refreshOption);
    res.status(201);
    res.send('User created successfully');
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() user: User): Promise<User> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
