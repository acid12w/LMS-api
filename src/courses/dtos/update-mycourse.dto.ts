import { IsOptional } from 'class-validator';

export class UpdateMyCoursesDto {
  @IsOptional()
  courseName: string;
  overview: string;
  difficulty: string;
  completedLessons: number;
  lessons: [];
  participants: number;
  rated: number;
  rating: number;
  tag: [];
  thumbNail: string;
  imageFull: boolean;
  createdDate?: Date;
}
