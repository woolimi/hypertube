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
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiQuery,
  ApiTags,
  PickType,
} from '@nestjs/swagger';
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

  @ApiOperation({ summary: 'Get all users', description: 'Get all users' })
  @ApiBearerAuth()
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'perPage', type: Number, required: false })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query() query: { page?: number; perPage?: number },
  ): Promise<User[]> {
    return this.userService.findAll(query.page || 1, query.perPage || 10);
  }

  @Patch('avatar')
  @ApiOperation({
    summary: 'Upload avatar image for user',
    description: 'Upload avatar image for user and return the url of the image',
  })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiCreatedResponse({ type: String })
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
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  )
  async uploadAvatar(@Req() req, @UploadedFile() image) {
    if (!image) {
      throw new BadRequestException('Image is required');
    }
    const url = process.env.BACK_HOST + '/' + image.path;
    await this.userService.update(req.user.userId, { image: url });
    return url;
  }

  @ApiOperation({ summary: 'Get user info by id' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    type: PickType(User, ['username', 'image', 'firstName', 'lastName']),
  })
  @Get(':id')
  async findOne(@Req() req, @Param('id') id: string): Promise<User> {
    const user = await this.userService.findOneById(id, req.user.userId === id);
    if (!user) {
      throw new BadRequestException("User doesn't exist");
    }
    return user;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user data endpoint' })
  @ApiBody({ type: UpdateUserDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
    @Req() req,
  ): Promise<UpdateResult> {
    if (req.user.userId !== id) {
      throw new UnauthorizedException();
    }
    return this.userService.update(id, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Req() req): Promise<void> {
    if (req.user.userId !== id) {
      throw new UnauthorizedException();
    }
    return this.userService.remove(id);
  }

  @Get('/:id/watched-movies')
  @ApiOperation({ summary: 'Get watched movie list of a user' })
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'language', type: String, required: false })
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
