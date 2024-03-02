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
  ValidationPipe,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentLengthDto } from './dto/comment.length.dto';

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
    @Body('content', new ValidationPipe()) content: CommentLengthDto,
    @Query('movieId', ParseIntPipe) movieId: number,
  ) {
    console.log('req comments/create', req.user);
    const userId = req.user.userId;
    const c = String(content);
    const createCommentDto = { userId, movieId, content: c };
    return this.commentService.createComment(createCommentDto);
  }

  @ApiOperation({ summary: 'update a comment' })
  @UseGuards(JwtAuthGuard)
  @Put(':id/update')
  async updateComment(
    @Body('content') content: string,
    @Param('id') commentId: number,
  ) {
    this.commentService.updateComment(commentId, content);
  }

  @ApiOperation({ summary: 'delete a comment' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id/delete')
  async deleteComment(@Param('id') commentId: number) {
    this.commentService.deleteComment(commentId);
  }
}
