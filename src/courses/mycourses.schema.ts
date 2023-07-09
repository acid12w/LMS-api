import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Users } from '../users/user.schema';
import { Lesson } from 'src/lesson/lesson.schema';


export type CoursesDocument = Courses & Document;

@Schema()
export class Courses {
  @Prop({ required: true })
  courseName: string;

  @Prop({ required: true })
  overview: string;

  @Prop({ required: true })
  difficulty: string;

  @Prop({ required: false })
  subject: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  instructorId: Users;

  @Prop({ default: 0 })
  completedLessons: number;

  @Prop({  type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Lesson'}] })
  lessons: Lesson[];

  @Prop({ default: 0 })
  participants: number;

  @Prop({ default: 1 })
  rated: number;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ required: false })
  tags: [];

  // @Prop({ required: true })
  // thumbNail: string;

  @Prop({ default: true })
  imageFull: boolean;

  @Prop({ default: false })
  isPublished: boolean;

  @Prop({ default: false })
  isFeatured: boolean;

  @Prop({ default: Date.now, immutable: true })
  createdDate?: Date;

  @Prop({ default: Date.now })
  modifiedDate?: Date;
}

export const CourseSchema = SchemaFactory.createForClass(Courses);
