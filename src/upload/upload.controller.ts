import { 
    Controller,
    Get, 
    Post, 
    UseInterceptors, 
    UploadedFile,
    ParseFilePipe,
    MaxFileSizeValidator,
    FileTypeValidator } from '@nestjs/common';
    import { FileInterceptor } from '@nestjs/platform-express';
// import { SharpPipe } from './sharp.pipe';
import { UploadService } from './upload.service'; 


@Controller('upload')
export class UploadController {
    constructor(private uploadService: UploadService){}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  // async uploadImage(@UploadedFile(SharpPipe) file: Express.Multer.File){   
  async uploadImage(@UploadedFile() file: Express.Multer.File){   
      const result = await this.uploadService.uploadCourseThumbnail(file); 
      return result;
    }
  
  
  // uploadFile(@UploadedFile(
  //   new ParseFilePipe({
  //     validators: [
  //       new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),  
  //       new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
  //     ],
  //   }),
  // )file: Express.Multer.File) { 
  //   const result = await this.uploadService.uploadCourseThumbnail(file); 
  //   return result;
  // }
}