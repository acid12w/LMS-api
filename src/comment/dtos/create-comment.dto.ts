import { IsNotEmpty } from 'class-validator';
import { Lesson } from 'src/lesson/lesson.schema';

export class CreateCommenteDto {
  lessonId: Lesson;
  username: string;
  text: string;
  // avatar: string;
  reply: [
    {
      username: string;
      text: string;
      // avatar: string;
    },
  ];
  createdDate?: Date;
}
