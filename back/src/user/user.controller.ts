import {
  Controller,
  Get,
  Body,
  Req,
  Param,
  Patch,
  Delete,
  UseInterceptors,
  UseGuards,
  UploadedFile,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UpdateResult } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { cleanImageFile } from 'src/helper';
import { MoviesWatchedService } from 'src/movie/movies-watched.service';
import { UserWatchedMoviesQueryDto } from './dto/user-watched-movies-query.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly moviesWatchedService: MoviesWatchedService,
  ) {}

  @ApiOperation({ summary: 'Get all users' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req): Promise<User[]> {
    return this.userService.findAll();
  }

  @Patch('avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './images/avatar',
        filename: (
          req: any,
          file: Express.Multer.File,
          cb: (error: Error | null, filename: string) => void,
        ) => {
          const { userId } = req.user;

          cleanImageFile(userId);
          const ext = file.originalname.split('.').pop();
          return cb(null, userId + '.' + ext);
        },
      }),
    }),
  )
  async uploadAvatar(@Req() req, @UploadedFile() image) {
    const url = process.env.BACK_HOST + '/' + image.path;
    await this.userService.update(req.user.userId, { image: url });
    return url;
  }

  @ApiOperation({ summary: 'Get user by id' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOneById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }

  @Get('/:id/watched-movies')
  @UseGuards(JwtAuthGuard)
  async getUserWatchedMovies(
    @Param('id') id: string,
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    )
    query: UserWatchedMoviesQueryDto,
  ) {
    return await this.moviesWatchedService.getUserWatchedMovies(
      id,
      query.page || 1,
      query.language || 'en-US',
    );
  }
}
