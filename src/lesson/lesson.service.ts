import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Lesson, LessonDocument } from './lesson.schema';
import { CreateLessonDto } from './dtos/create.lesson-dto';

@Injectable()
export class LessonService {
  constructor(
    @InjectModel(Lesson.name)
    private lessonModel: Model<LessonDocument>,
  ) {}

  async getLessonById(id: string){
    const lesson = this.lessonModel.find({courseId: id}).populate("comments");
    return lesson;
  }

  async getAllComments(id: string){
    const comments = await this.lessonModel.findById({_id : id}).populate("comments");
    return comments;
  }

  async create(createLessonDto: CreateLessonDto) {
    const createdLesson = new this.lessonModel(createLessonDto);
    return createdLesson.save();
  }

  async addComment(data){
    const lesson = this.lessonModel.findOneAndUpdate(
      {_id: data.lessonId},
      { $push: { comments: data.id  } },
    )
    return lesson;
  }

  async delete(id) {
    const lesson = this.lessonModel.deleteOne({ _id: id }).exec();
    return lesson;
  }
}
