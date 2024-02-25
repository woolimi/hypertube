import {
  Controller,
  Get,
  Header,
  Headers,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  Param,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MoviesQueryDto } from './dto/movies-query.dto';
import { MovieService } from './movie.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { MovieQueryDto } from './dto/movie-query.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { createReadStream, statSync } from 'fs';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Controller('movies')
// @UseInterceptors(CacheInterceptor)
export class MovieController {
  constructor(
    private readonly movieService: MovieService,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  @Get('/')
  async getMovies(
    @Query()
    query: MoviesQueryDto,
  ) {
    try {
      return await this.movieService.getMovies(query);
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  @Get('/:movie_id')
  @UseGuards(JwtAuthGuard)
  async getMovie(@Param('movie_id') movie_id, @Query() query: MovieQueryDto) {
    try {
      const data = await this.movieService.getMovie(movie_id, query);
      const imdb_id = data.imdb_id;
      const torrents = await this.movieService.getMovieTorrent(imdb_id);

      return { ...data, torrents };
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  // @Header('Content-Type', 'video/mp4')
  @Get('/:movie_id/stream/:torrent_hash')
  @Header('Accept-Ranges', 'bytes')
  async streamMovie(
    @Param('movie_id') movie_id: string,
    @Param('torrent_hash') torrent_hash: string,
    @Headers() headers,
    @Req() req,
    @Res() res,
  ) {
    // Check access token
    const curAccessToken = req.cookies['accessToken'];
    const curRefreshToken = req.cookies['refreshToken'];
    if (!curAccessToken) {
      if (!curRefreshToken) throw new UnauthorizedException();
      const payload = this.jwtService.verify(curRefreshToken, {
        secret: process.env.JWT_SECRET,
      });
      const { accessToken, ...accessOption } =
        this.authService.getCookieWithJwtAccessToken(payload.userId);
      const { refreshToken, ...refreshOption } =
        this.authService.getCookieWithJwtRefreshToken(payload.userId);

      res.cookie('accessToken', accessToken, accessOption);
      res.cookie('refreshToken', refreshToken, refreshOption);
      await this.userService.saveRefreshToken(payload.userId, refreshToken);
    } else {
      this.jwtService.verify(curAccessToken, {
        secret: process.env.JWT_SECRET,
      });
    }

    // Video streaming
    const videoPath = 'movies/video.mov';
    const { size } = statSync(videoPath);
    const videoRange = headers.range;

    if (videoRange) {
      const parts = videoRange.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0]);
      const end = parts[1] ? parseInt(parts[1]) : size - 1;
      const chunksize = end - start + 1;
      const readStreamfile = createReadStream(videoPath, {
        start,
        end,
        highWaterMark: 60,
      });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${size}`,
        'Content-Length': chunksize,
      };
      res.writeHead(HttpStatus.PARTIAL_CONTENT, head); //206
      readStreamfile.pipe(res);
    } else {
      const head = {
        'Content-Length': size,
      };
      res.writeHead(HttpStatus.OK, head); //200
      createReadStream(videoPath).pipe(res);
    }
  }
}
