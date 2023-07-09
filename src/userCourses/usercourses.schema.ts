import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Courses } from 'src/courses/mycourses.schema';
import { Users } from 'src/users/user.schema';


export type UserCoursesDocument = UserCourses & Document;

@Schema()
export class UserCourses {
  @Prop({ default: false })
  status: boolean;
  @Prop({ required: true })
  thumbNail: string;
  @Prop({ required: true })
  courseName: string;
  @Prop({ required: true })
  currentLessons: number;
  @Prop({ required: true })
  totalLessons: number;
  @Prop({ required: true })
  completedLessons: number;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Courses' })
  courseId: Courses;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  userId: Users;
}

export const UserCoursesSchema = SchemaFactory.createForClass(UserCourses);  
