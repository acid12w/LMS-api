import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users, UsersSchema } from './user.schema';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from "@nestjs/jwt";
// import { RoleGuard } from 'src/roles/roles.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ],

  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtService],
  exports: [UsersService],
})
export class UsersModule {}
