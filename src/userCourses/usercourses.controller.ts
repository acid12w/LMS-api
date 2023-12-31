import { Body, Controller, Get, Param, Post, UseGuards, Request, Patch } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { creatUsersDto } from './dto/createUserCourse.dto';
import { UserCoursesService } from './usercourses.service';

@Controller('userCourses')
export class UserCoursesController {
  constructor(
    private userCoursesService: UserCoursesService,
    private usersService: UsersService,
  ){}

  @Get('/:id')
  findAll(@Param('id') id: string) {
     const result = this.userCoursesService.findAll(id);
     return result;
  }

  @Post() 
  @UseGuards(JwtAuthGuard) 
  async addCourse(@Request() req, @Body() body: creatUsersDto) {
    body.userId = req.user.sub;
    const course = await this.userCoursesService.create(body); 
    this.usersService.updateMycourse(req.user.sub, course._id);  
    return course;
  }

  @Patch('/:id')
  async updateCourse(@Param('id') id, @Body() body){
    const course = await this.userCoursesService.update(id, body);   
    return course;
  }
}