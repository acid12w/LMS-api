import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MycourseModule } from './courses/mycourse.module';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { LessonModule } from './lesson/lesson.module';
import { UploadModule } from './upload/upload.module';
import { UserCoursesModule } from './userCourses/usercourses.module';
import { CommentController } from './comment/comment.controller';


console.log("mongo URI:" +  process.env.API_KEY)

@Module({
  imports: [
    MycourseModule,
    CommentModule,
    MulterModule.register({
      
    }),
    MongooseModule.forRoot(
      process.env.API_KEY,
    ),
    UserCoursesModule,
    UsersModule,
    AuthModule,
    LessonModule,
    UploadModule,
  ],
  controllers: [AppController, UsersController, CommentController],
  providers: [AppService],
})
export class AppModule {}
