import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Request,
  UseGuards
} from '@nestjs/common';

import { CreateMyCourseDto } from './dtos/create-mycourse.dto';
import { UpdateMyCoursesDto } from './dtos/update-mycourse.dto';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';

import { CoursesService } from './mycourses.service';

@Controller('/mycourses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}  
 
  @Get()
  async getcourses() {
    const result = await this.coursesService.find(); 
    return result;
  }

  @UseGuards(JwtAuthGuard)  
  @Get('/:id')
  async started(@Param('id')  id: string) {  
    const result = await this.coursesService.findById(id);  
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/instructor/:id')
  async getMycourses(@Param('id')  id: string) {
    const result = await this.coursesService.findByInstructorId(id);    
    return result;
  }
  
  @UseGuards(JwtAuthGuard, RoleGuard)  
  @Roles('instructor') 
  @Post('/create')
  async create(@Body() body: CreateMyCourseDto, @Request() req){ 
    body.instructorId  = req.user.sub;
    let result = await this.coursesService.create(body); 
    console.log(result);
    return result;
  }

  @UseGuards(JwtAuthGuard, RoleGuard)  
  @Roles('instructor')
  @Patch('edit/:id')
  async update(@Param('id') id: string, @Body() body) {
    const result = await this.coursesService.updateCourse(id, body);
    return result;
  }

  @UseGuards(JwtAuthGuard, RoleGuard)  
  @Roles('instructor')
  @Delete('delete/:id')
  async remove(@Param('id') id: string) { 
    const result = await this.coursesService.removeCourse(id); 
    return result;
  }
}
