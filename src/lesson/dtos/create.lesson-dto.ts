import { IsNotEmpty } from 'class-validator';

export class CreateLessonDto {
  title: string;
  resource: string;
  videoId: string;
  courseId: string;
  comments: [];
}
