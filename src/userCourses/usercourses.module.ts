import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { UserCoursesController } from './usercourses.controller';
import { UserCourses, UserCoursesSchema } from './usercourses.schema';
import { UserCoursesService } from './usercourses.service';

@Module({
    imports: [
        UsersModule,
        MongooseModule.forFeature([{ name: UserCourses.name, schema: UserCoursesSchema }]),
      ],
  controllers: [UserCoursesController],
  providers: [UserCoursesService],
})
export class UserCoursesModule {}