import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Upload, UploadDocument } from './upload.schema';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import * as FormData from 'form-data';




@Injectable()
export class UploadService {
    constructor(
        @InjectModel(Upload.name)
        private uploadModel: Model<UploadDocument>,
        private readonly httpService: HttpService,
      ) {}

    async uploadCourseThumbnail(
    avatar: Express.Multer.File,
    ): Promise<any> {
        const formData = new FormData();
        formData.append('image', avatar.buffer.toString('base64'));
        const { data: imageData } = await firstValueFrom(
          this.httpService
            .post(
              `https://api.imgbb.com/1/upload?key=e4d873042030b8d785167de035b8d610`,  
              formData
            )
            .pipe(
              catchError((error: AxiosError) => {
                throw error;
              }),
            ),
        );
    return imageData;
    }

    async deleteCourseThumbnail(){
      
    }
}
