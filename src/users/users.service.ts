import { Model } from 'mongoose';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name)
    private usersModel: Model<UsersDocument>,
  ) {}

  async create(
    username: string,
    email: string,
    password: string,
  ): Promise<any> {
    const user = new this.usersModel({ username, email, password});
    return user.save();
  }

  async save(user: any) {
    return user.save();
  }

  async findOne(email: string): Promise<any> {
    const user = this.usersModel.findOne({ email: email }).populate("myCourses");
    return user;
  }

  async findById(id: string): Promise<any> {
    const user = this.usersModel.findById(id);
    return user;
  }

  async update(id: string, attrs: Partial<Users>) {
    const user = await this.usersModel.findById(id).exec();
    if (!user) throw new NotFoundException();
    Object.assign(user, attrs);
    return (await user).save();
  }

  async updateMycourse(id, courseId) {
    const user = this.usersModel.findOneAndUpdate(  
      {_id: id},
      { $push: { myCourses: courseId  }},
    ).exec();
    return user;  
  }

  async updateUser(username: string, attrs: Partial<Users>) {   
    const user = await this.usersModel.findOne({ username: username }).exec();
    if (!user) throw new NotFoundException();  
    Object.assign(user, attrs);
    return (await user).save();  
  }

  async remove(id: number): Promise<any> {
    const user = await this.usersModel.deleteOne({ id }).exec();
    return user;
  }
}
