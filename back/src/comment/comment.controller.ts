import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiTags('Comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: 'get all comments for a movie' })
  @Get()
  getAllComments(@Query('movieId', ParseIntPipe) movieId: number) {
    // console.log(movieId, isNumber(movieId));
    return this.commentService.getCommentsForMovie(movieId);
  }

  @ApiOperation({ summary: 'create a comment' })
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createComment(
    @Req() req,
    @Body('content') content: string,
    @Query('movieId', ParseIntPipe) movieId: number,
  ) {
    console.log('req comments/create', req.user);
    const userId = req.user.userId;
    const createCommentDto = { userId, movieId, content };
    return this.commentService.createComment(createCommentDto);
  }

  @ApiOperation({ summary: 'update a comment' })
  @Put(':id/update')
  async updateComment(
    @Body('content') content: string,
    @Param('id') commentId: number,
  ) {
    this.commentService.updateComment(commentId, content);
  }

  @ApiOperation({ summary: 'delete a comment' })
  @Delete(':id/delete')
  async deleteComment(@Param('id') commentId: number) {
    this.commentService.deleteComment(commentId);
  }
}
