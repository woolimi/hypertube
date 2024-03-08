import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CommentLengthDto } from './dto/comment.length.dto';
import { CommentResponseDto } from './dto/comment-response.dto';

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
  @ApiOkResponse({ type: CommentResponseDto, isArray: true })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getAllComments(@Query('movieId', ParseIntPipe) movieId: number) {
    return this.commentService.getCommentsForMovie(movieId);
  }

  @Post('/')
  @ApiOperation({
    summary: 'Create a comment',
    description: 'Create a comment',
  })
  @ApiBody({ type: CommentLengthDto })
  @ApiCreatedResponse({ type: CommentResponseDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createComment(
    @Req() req,
    @Body() data: CommentLengthDto,
    @Query('movieId', ParseIntPipe) movieId: number,
  ) {
    const userId = req.user.userId;
    const content = data.content;
    const createCommentDto = { userId, movieId, content };
    const newComment =
      await this.commentService.createComment(createCommentDto);
    return {
      ...newComment,
      User: {
        id: newComment.User.id,
        username: newComment.User.username,
        image: newComment.User.image,
      },
    };
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a comment',
    description: 'Update a comment',
  })
  @ApiBody({ type: CommentLengthDto })
  @ApiOkResponse({ type: CommentResponseDto })
  @ApiQuery({ name: 'id', required: true, type: Number })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateComment(
    @Body('content') content: string,
    @Param('id') commentId: number,
    @Req() req,
  ) {
    const authorId = req.user.userId;
    const updatedComment = await this.commentService.updateComment(
      commentId,
      authorId,
      content,
    );
    return {
      ...updatedComment,
      User: {
        id: updatedComment.User.id,
        username: updatedComment.User.username,
        image: updatedComment.User.image,
      },
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete a comment' })
  @ApiOkResponse({ type: CommentResponseDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async deleteComment(@Param('id') commentId: number, @Req() req) {
    const authorId = req.user.userId;
    const deletedComment = await this.commentService.deleteComment(
      commentId,
      authorId,
    );
    return {
      ...deletedComment,
      User: {
        id: deletedComment.User.id,
        username: deletedComment.User.username,
        image: deletedComment.User.image,
      },
    };
  }
}
