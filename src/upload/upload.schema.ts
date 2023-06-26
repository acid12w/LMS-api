import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';



export type UploadDocument = Upload & Document;

@Schema()
export class Upload {
  @Prop({ required: true })
  ulr: string;
}

export const Uploadschema = SchemaFactory.createForClass(Upload);
