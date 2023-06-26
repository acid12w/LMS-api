import { IsEmail } from 'class-validator';

export class UsersDto {
  username: string;
  @IsEmail()
  email: string;

  // @IsNotEmpty()
  password: string;
  refreshToken: string;

  bio: string;
  roles: [];
  myCourses: [];
  createdDate: Date;
  modifiedDate: Date;
}
