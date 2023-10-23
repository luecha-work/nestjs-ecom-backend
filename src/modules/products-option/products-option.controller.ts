import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Users } from 'src/db/entities/Users';
import { GetUser } from 'src/modules/auth/decorator/get-user.decorator';
import { BaseResultError } from '../common/base-result-error.interface';
import { BaseResultData } from '../common/base-result.interface';
import { CreateOptionsDto } from './dto/create-options.dto';
import { UpdaetOptionsDto } from './dto/update-options.dto';
import { ProductsOptionService } from './products-option.service';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard())
@ApiTags('products-option')
@Controller('products-option')
export class ProductsOptionController {
  constructor(private readonly productsOptionService: ProductsOptionService) {}

  @Get()
  async paginatePage(@Query('page') page: number, @GetUser() user_info: Users) {
    try {
      const products: any = await this.productsOptionService.paginate(page);

      return new BaseResultData('200', products, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async createProduct(
    @GetUser() user_info: Users,
    @Query('product_id') product_id: string,
    @Body() body: CreateOptionsDto,
  ) {
    try {
      const products: any = await this.productsOptionService.create({
        ...body,
        createAt: new Date(),
        updateAt: new Date(),
        craeteBy: user_info.email,
        updateBy: '',
        products: product_id,
      });

      return new BaseResultData('200', products, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    try {
      const product = await this.productsOptionService.findOne({ id }, [
        'products',
      ]);

      return new BaseResultData('200', product, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdaetOptionsDto,
    @GetUser() user_info: Users,
  ) {
    try {
      await this.productsOptionService.update(id, {
        ...body,
        updateBy: user_info.email,
        updateAt: new Date(),
      });

      const resultData = await this.productsOptionService.findOne({ id }, [
        'products',
      ]);

      return new BaseResultData('200', resultData, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.productsOptionService.delete(id);

      return new BaseResultData('200', [], '', 'Success deleted successfully');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
