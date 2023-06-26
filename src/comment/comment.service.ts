import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './comment.shema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)
    private commentModel: Model<CommentDocument>,
  ) {}
  async create(name: string, lessonId, text: string) {
    const comment = new this.commentModel({ name, lessonId, text });
    return comment.save();
  }

  async save(results: any) {
    return results.commentModel.save();
  }

  async findById(id: string) {
    const comment = this.commentModel.find({ lessonId: id });
    return comment;
  }

  async update(id: string, text: string, username: string) {
    const reply = this.commentModel.findOneAndUpdate(
      { _id: id },
      { $push: { reply: { text, name: username } } },
    );
    return reply;
  }
}
