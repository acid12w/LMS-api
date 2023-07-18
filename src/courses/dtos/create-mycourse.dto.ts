import { IsNotEmpty } from 'class-validator';

export class CreateMyCourseDto {
  @IsNotEmpty()
  courseName: string;

  @IsNotEmpty()
  overview: string;

  @IsNotEmpty()
  difficulty: string;

  completedLessons: number;

  @IsNotEmpty()
  participants: number; 

  rated: number;

  rating: number;

  // @IsNotEmpty()
  tags: any[];

  @IsNotEmpty()
  thumbNail: string;

  imageFull: boolean;

  isFeatured: boolean;

  isPublished: boolean;

  instructorId: string;
}
