import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LessonModule } from 'src/lesson/lesson.module';
import { CoursesController } from './mycourses.controller';
import { CourseSchema, Courses } from './mycourses.schema';
import { CoursesService } from './mycourses.service';
import { HttpModule } from '@nestjs/axios';
import { RoleGuard } from 'src/roles/roles.guard';
import { APP_GUARD } from '@nestjs/core';


@Module({
  imports: [ 
    MongooseModule.forFeature([
      { name: Courses.name, schema: CourseSchema }, 
    ]), 
    HttpModule
  ],
  controllers: [CoursesController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    CoursesService,
    ],
  exports: [CoursesService],
})
export class MycourseModule {}
