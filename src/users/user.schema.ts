import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Courses } from '../courses/mycourses.schema';
import { UserCourses } from 'src/userCourses/usercourses.schema';

import { Exclude } from 'class-transformer';
import { Role } from 'src/roles/role.enum';

export type UsersDocument = Users & Document;

@Schema()
export class Users {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  profileUrl: string;

  @Prop({ required: true })  
  @Exclude()
  password: string;

  @Prop()
  refreshToken?: string;

  @Prop()
  bio: string;

  @Prop({default: "student" })
  roles: Role[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserCourses' }] })
  myCourses: UserCourses[];

  @Prop({ default: Date.now, immutable: true })
  createdDate?: Date;

  @Prop({ default: Date.now })
  modifiedDate?: Date;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
