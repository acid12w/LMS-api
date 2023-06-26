
import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateUserCourseDto {

  @IsString()
  @IsOptional()
    thumbNail: string;
    courseName: string;
    newCourseName: string;
    completedLesson: string;
    totalLessons: string;
    courseId: string;
}