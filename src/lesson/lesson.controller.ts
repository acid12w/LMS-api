import { Body, Controller, Post, Delete, Param, Get } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CoursesService } from '../courses/mycourses.service';

@Controller('lesson')
export class LessonController {
  constructor(
    private lessonService: LessonService,
    private mycoursesService: CoursesService,
  ) {}

  @Get('/:id')
  async get(@Param('id') id: string){ 
    const lesson = await this.lessonService.getLessonById(id);
    return lesson;
  }

  @Get('comments/:id')
  async GetAllComments(@Param('id') id: string) {
    const comments = await this.lessonService.getAllComments(id);
    return comments;
  }
 
  @Post('/create')
  async create(@Body() body) {
   const lesson = await this.lessonService.create(body);
   this.mycoursesService.update(body.courseId, lesson._id);
   return lesson;
  }


  @Delete('/remove/:id')
  async remove(@Param('id') id: string) {
    const lesson = await this.lessonService.delete(id); 
    return lesson;
  }
}
