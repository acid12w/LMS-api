import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserCourses, UserCoursesDocument } from './usercourses.schema';

@Injectable()
export class UserCoursesService {
    constructor(
        @InjectModel(UserCourses.name)
        private userCoursesModel: Model<UserCoursesDocument>,
      ) {}
 
  create(body: {}) {
    const result  = new this.userCoursesModel({...body});
    return result.save()
  }

  findAll(id) {
   const results = this.userCoursesModel.findOne({courseId : id});
   return results;
  }

  async update(id: string, attrs: Partial<UserCourses>) {
    const userCourse = await this.userCoursesModel.findById(id);
    if (!userCourse) throw new NotFoundException();
    Object.assign(userCourse, attrs);
    return (await userCourse).save();
  }
}