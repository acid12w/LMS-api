import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Courses } from 'src/courses/mycourses.schema';
import { Comment } from 'src/comment/comment.shema';

export type LessonDocument = Lesson & Document;

@Schema()
export class Lesson {
  @Prop({ required: true })
  title: string;

  @Prop()
  resource: string;

  @Prop()
  videoId: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'MyCourses' })
  courseId: Courses;  
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
