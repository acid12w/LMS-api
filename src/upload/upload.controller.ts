import { 
    Controller,
    Post, 
    UseInterceptors, 
    UploadedFile,
} from '@nestjs/common';
    import { FileInterceptor } from '@nestjs/platform-express';
import { SharpPipe } from './sharp.pipe';
import { UploadService } from './upload.service'; 


@Controller('upload')
export class UploadController {
    constructor(private uploadService: UploadService){}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile(SharpPipe) file: Express.Multer.File){   
  // async uploadImage(@UploadedFile() file: Express.Multer.File){   
      const result = await this.uploadService.uploadCourseThumbnail(file); 
      return result;
  }
}