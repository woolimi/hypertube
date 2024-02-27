import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { MovieService } from 'src/movie/movie.service';
import { isNumberObject } from 'util/types';
import { isNumber } from 'util';

@ApiTags('Comments')
@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly movieService: MovieService,
  ) {}

  @Get()
  getAllComments(@Query('movieId', ParseIntPipe) movieId: number) {
    // console.log(movieId, isNumber(movieId));
    return this.commentService.getCommentsForMovie(movieId);
  }

  @ApiOperation({ summary: 'create comments' })
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createComment(
    @Req() req,
    @Body('content') content: string,
    @Query('movieId', ParseIntPipe) movieId: number,
  ) {
    const userId = req.user.id;
    const createCommentDto = { userId, movieId, content };
    this.commentService.createComment(createCommentDto);
  }
}
