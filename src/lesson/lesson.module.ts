import { Module } from '@nestjs/common';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Lesson, LessonSchema } from './lesson.schema';
import { MycourseModule } from 'src/courses/mycourse.module';

@Module({
  imports: [
    MycourseModule,
    MongooseModule.forFeature([{ name: Lesson.name, schema: LessonSchema }]),
  ],
  controllers: [LessonController],
  providers: [LessonService],
  exports: [LessonService]
})
export class LessonModule {}
