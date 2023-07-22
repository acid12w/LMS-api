import { Model } from 'mongoose';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserCourses, UserCoursesDocument } from './usercourses.schema';

@Injectable()
export class UserCoursesService {
    constructor(
        @InjectModel(UserCourses.name)
        private userCoursesModel: Model<UserCoursesDocument>,
      ) {}
 
  async create(body) {
   const course = this.userCoursesModel.find ({userId : body.userId, courseId: body.courseId});
   if((await course).length > 0) throw new BadRequestException('course already added');
    const result  = new this.userCoursesModel({...body}); 
    return result.save()
  }

  findAll(id) {
    if(id === "undefined") return;
   const results = this.userCoursesModel.find({userId : id});
   return results;
  }

  async update(id: string, attrs: Partial<UserCourses>) {
    const userCourse = await this.userCoursesModel.findById(id);
    if (!userCourse) throw new NotFoundException();
    Object.assign(userCourse, attrs);
    return (await userCourse).save();
  }
}