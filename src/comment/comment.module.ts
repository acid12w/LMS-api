import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LessonModule } from '../lesson/lesson.module';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Comment, CommentSchema } from './comment.shema';

@Module({
  imports: [
    LessonModule,
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }])
  ],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
