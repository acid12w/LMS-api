import { IsEmail } from 'class-validator';

export class creatUsersDto {
    status: boolean;
    thumbNail: string;
    courseName: string;
    currentLessons: number;
    totalLessons: number;
    completedLessons: number;
    courseId: [];
    userId: [];
}
