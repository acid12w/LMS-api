import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Courses, CoursesDocument } from './mycourses.schema';


@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Courses.name)
    private coursesModel: Model<CoursesDocument>,
  ) {}

  async create(createMyCourseDto): Promise<Courses> {
    const createdCourse = new this.coursesModel(createMyCourseDto);
    return createdCourse.save();
  }

  async save(user: any): Promise<Courses> {
    return user.save();
  }

  async find() {
    const course = await this.coursesModel.find({isPublished: true}).populate("lessons");  
    return course;
  }

  async findById(id: string) {
    const course = await this.coursesModel.findById(id).populate("lessons");
    return course;
  }

  async findByCourseName(courseName: string) {
    const course = await this.coursesModel.find({ courseName });
    return course;
  }

  async findByInstructorId(id) {
    const course = await this.coursesModel.find({ instructorId: id });  
    return course;
  }

  async updateCourse(id: string, attrs: Partial<Courses>) {
    const course = await this.coursesModel.findById(id);
    if (!course) throw new NotFoundException('course not found');
    Object.assign(course, attrs);
    return (await course).save();
    
  }

  async update(id, lessonId) {
  const result =  await this.coursesModel.findOneAndUpdate(
    {_id: id},
    { $push: { lessons: lessonId  }},
  )
    return result;
  }

  async removeCourse(id: string) {
    const course = await this.coursesModel.deleteOne({ _id: id }).exec();
    return course;
  }
}
