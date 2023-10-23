import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';

@Controller('common-upload')
export class UploadController {
  @Post('upload-video')
  @UseInterceptors(
    FileInterceptor('video', {
      storage: diskStorage({
        destination: './uploads/videos',
        filename(_, file, callback) {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadVideo(@UploadedFile() file) {
    const video_url = `${process.env.BASE_URL}/common-upload/upload-video/${file.filename}`;
    const video_name = file.filename;
    const filePath = path.join(process.cwd(), 'video_url.txt');

    await this.deleteVideo(filePath);

    const contentToWrite = JSON.stringify(
      { video_url: video_url, video_name: video_name },
      null,
      2,
    );

    try {
      await fs.writeFileSync(filePath, contentToWrite, 'utf8');
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการเขียนไฟล์:', error);
    }

    return {
      video_url: video_url,
    };
  }

  @Get('video-path')
  async getVideoPath() {
    const rootPath = process.cwd();
    const filePath = path.join(rootPath, 'video_url.txt');

    try {
      const rawData = fs.readFileSync(filePath, 'utf8');

      if (!rawData) {
        return { error: 'Empty file' };
      }

      const jsonData = JSON.parse(rawData);


      return jsonData;
    } catch (error) {
      return { error: 'Error reading/parsing JSON data' };
    }
  }

  @Get('upload-video/:path')
  async getVideo(@Param('path') path, @Res() res: Response) {
    res.sendFile(path, { root: `${process.env.VIDEO_PATH}` });
  }

  async deleteVideo(filePath: string) {
    try {
      const rawData = fs.readFileSync(filePath, 'utf8');
      const jsonData = JSON.parse(rawData);
      const videoPathOld: string = `${process.env.VIDEO_PATH}/${jsonData?.video_name}`;

      await fs.unlink(videoPathOld, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        } else {
          console.log('File deleted successfully');
        }
      });
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการลบวีดีโอ:', error);
    }
  }
}
