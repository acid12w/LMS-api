import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLessonDto {
  title: string;
  @IsOptional()
  resource: string;
  videoId: string;
  courseId: string;
  comments: [];
}
