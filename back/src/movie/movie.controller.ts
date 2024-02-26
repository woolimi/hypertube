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
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { promisify } from 'util';
import torrentStream from 'torrent-stream';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import pump from 'pump';

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
    const engine = torrentStream('36DBE5857EC8352361F2E15D889BB78D20E70BEB', {
      tmp: './movies',
      verify: true,
      uploads: 0,
    });

    engine.on('ready', async () => {
      engine.files.forEach(async (file) => {
        if (this.movieService.isVideoFile(file.name)) {
          console.log('-----file selected for streaming-----');
          file.select();
          const stream = file.createReadStream();
          const realExtension = path.extname(file.name).slice(1);

          if (realExtension === 'mp4' || realExtension === 'mkv') {
            pump(stream, res);
          } else {
            ffmpeg()
              .input(stream)
              .outputOptions('-movflags frag_keyframe+empty_moov')
              .outputFormat('mp4')
              .on('start', () => {
                console.log('start');
              })
              .on('progress', (progress) => {
                console.log(`progress: ${progress.timemark}`);
              })
              .on('end', () => {
                console.log('Finished processing');
              })
              .on('error', (err) => {
                console.log(`ERROR: ${err.message}`);
              })
              .inputFormat(realExtension)
              .audioCodec('aac')
              .videoCodec('libx264')
              .pipe(res);
          }
          res.on('close', () => {
            console.log('close');
            stream.destroy();
          });
        } else {
          console.log('-----file with wrong extension-----');
        }
      });
    });
  }
}
