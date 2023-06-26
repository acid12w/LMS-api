import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { HttpModule } from '@nestjs/axios';
import { Upload, Uploadschema } from './upload.schema';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
    imports: [ 
        MongooseModule.forFeature([
          { name: Upload.name, schema: Uploadschema },
        ]), 
        HttpModule
      ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}