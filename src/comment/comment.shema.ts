import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Lesson } from 'src/lesson/lesson.schema';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  text: string;

  // @Prop({ required: true })
  // avatar: string;

  @Prop()
  reply: [
    {
      name: string;
      text: string;
      // avatar: string;
    },
  ];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'lesson' })
  lessonId: Lesson;

  @Prop({ default: Date.now, immutable: true })
  createdDate?: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
