import { IsEmail } from 'class-validator';

export class UsersDto {
    status: boolean;
    currentCourse: number;
    UserId: string;
}
