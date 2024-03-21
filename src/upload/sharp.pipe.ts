import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as path from 'path';
import * as sharp from 'sharp';

@Injectable()
export class SharpPipe implements PipeTransform<Express.Multer.File, Promise<any>> {

  async transform(image: Express.Multer.File): Promise<any> {
    // const originalname = path.parse(image.originalname).name;
    // const filename = Date.now() + '-' + originalname + '.webp';

    try{
        const newImage = await sharp(image.buffer)
        .resize(1920,1350)
        .webp({ effort: 3 })
        .toBuffer()
        // .toFile(path.join('uploads', filename));

        return {"buffer":newImage};
    } catch(error){
      console.error(error)
    }
 
  }
} 