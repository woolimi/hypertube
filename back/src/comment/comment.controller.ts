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
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CommentLengthDto } from './dto/comment.length.dto';

@ApiTags('Comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/')
  @ApiOperation({
    summary: 'Get all comments of a movie',
    description: 'Get all comments of a movie. MovieId query param is required',
  })
  @ApiQuery({ name: 'movieId', required: true, type: Number })
  getAllComments(@Query('movieId', ParseIntPipe) movieId: number) {
    return this.commentService.getCommentsForMovie(movieId);
  }

  @Post('/')
  @ApiOperation({
    summary: 'Create a comment',
    description: 'Create a comment',
  })
  @ApiBody({ type: CommentLengthDto })
  @UseGuards(JwtAuthGuard)
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

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a comment',
    description: 'Update a comment',
  })
  @ApiBody({ type: String })
  @ApiQuery({ name: 'id', required: true, type: Number })
  @UseGuards(JwtAuthGuard)
  async updateComment(
    @Body('content') content: string,
    @Param('id') commentId: number,
  ) {
    this.commentService.updateComment(commentId, content);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete a comment' })
  @UseGuards(JwtAuthGuard)
  async deleteComment(@Param('id') commentId: number) {
    this.commentService.deleteComment(commentId);
  }
}
