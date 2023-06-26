import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Courses } from 'src/courses/mycourses.schema';


export type UserCoursesDocument = UserCourses & Document;

@Schema()
export class UserCourses {
  @Prop({ default: false })
  status: boolean;
  @Prop({ required: true })
  currentCourse: number;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course' })
  courseId: Courses;
}

export const UserCoursesSchema = SchemaFactory.createForClass(UserCourses);
