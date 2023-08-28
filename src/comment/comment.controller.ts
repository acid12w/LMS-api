import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Request,
  UseGuards,
  Param,
  Patch,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommenteDto } from './dtos/create-comment.dto';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LessonService } from '../lesson/lesson.service';

@Controller('comment')
export class CommentController {
  constructor(
    private readonly lessonService: LessonService,
    private readonly commentService: CommentService,
    ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() body: CreateCommenteDto, 
  ) {
    let result = await this.commentService.create(body.username, body.lessonId, body.text); 
    await this.lessonService.addComment({lessonId: body.lessonId, id: result._id});
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getComment(@Param('id') id: string) {
    return this.commentService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async updateComment(@Param('id') id: string, @Body() body){
    const result = await this.commentService.update(
      id,
      body.text,
      body.username,
    );
    return result;
  }
}
