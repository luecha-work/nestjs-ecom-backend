import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as fs from 'fs/promises';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('upload-product')
export class UploadProductController {
  @Get('test')
  testUpload() {
    return 'ss';
  }

  @Post('imagepayment')
  @UseInterceptors(
    FileInterceptor('imagepayment', {
      storage: diskStorage({
        destination: './uploads/payment',
        filename(_, file, callback) {
          const allowedExtensions = ['.jpg', '.jpeg', '.png']; // นามสกุลที่ยอมรับ
          const ext = extname(file.originalname).toLowerCase();
          if (!allowedExtensions.includes(ext)) {
            // นามสกุลไม่ถูกต้อง
            return callback(null, 'type file is not match');
          }
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadProfileFilePayment(@UploadedFile() file) {
    return {
      url: `${process.env.BASE_URL}/upload-product/payment/${file.filename}`,
    };
  }

  @Post('image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/products',
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
  uploadProfileFile(@UploadedFile() file) {
    return {
      url: `${process.env.BASE_URL}/upload-product/uploads/${file.filename}`,
    };
  }

  @Get('uploads/:path')
  async getProductImage(@Param('path') path, @Res() res: Response) {
    res.sendFile(path, { root: `${process.env.PRODUCTS_PATH}` });
  }

  @Get('payment/:path')
  async getProductImagePayment(@Param('path') path, @Res() res: Response) {
    res.sendFile(path, { root: `${process.env.PRODUCTS_PAYMENT_PATH}` });
  }

  @Delete(':path')
  async deleteProductPicture(@Param('path') path: string) {
    const imagePath = `${process.env.PRODUCTS_PATH}/${path}`;

    try {
      await fs.unlink(imagePath);
      return { message: 'รูปถูกลบแล้ว' };
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการลบรูปภาพ:', error);
      throw new Error('ไม่สามารถลบรูปภาพได้');
    }
  }
}
