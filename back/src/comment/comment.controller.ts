import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CommentLengthDto } from './dto/comment.length.dto';

@ApiTags('Comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: 'get all comments for a movie' })
  @Get()
  getAllComments(@Query('movieId', ParseIntPipe) movieId: number) {
    return this.commentService.getCommentsForMovie(movieId);
  }

  @ApiOperation({ summary: 'create a comment' })
  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createComment(
    @Req() req,
    @Body() data: CommentLengthDto,
    @Query('movieId', ParseIntPipe) movieId: number,
  ) {
    Logger.log('Create Comment', req.user);
    const userId = req.user.userId;
    const content = data.content;
    const createCommentDto = { userId, movieId, content };
    return this.commentService.createComment(createCommentDto);
  }

  @ApiOperation({ summary: 'update a comment' })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateComment(
    @Body('content') content: string,
    @Param('id') commentId: number,
  ) {
    this.commentService.updateComment(commentId, content);
  }

  @ApiOperation({ summary: 'delete a comment' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteComment(@Param('id') commentId: number) {
    this.commentService.deleteComment(commentId);
  }
}
