import { Controller, Get, Param } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './comment.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentController {}
