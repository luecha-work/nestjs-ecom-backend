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
import { BaseResultError } from './../common/base-result-error.interface';
import { BaseResultData } from './../common/base-result.interface';
import { CategoryProductService } from './category-product.service';
import { CreateCategoryOrderDto } from './dto/create-category.dto';
import { UpdateCategoryOrderDto } from './dto/update-category.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard())
@ApiTags('category-product')
@Controller('category-product')
export class CategoryProductController {
  constructor(private readonly categoryService: CategoryProductService) {}

  @Get()
  async paginatePage(@Query('page') page: number) {
    try {
      const category: any = await this.categoryService.paginate(page);

      return new BaseResultData('200', category, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('all-category')
  async findAllCategory() {
    try {
      const category: any = await this.categoryService.all();

      return new BaseResultData('200', category, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async createPaymentType(
    @GetUser() user_info: Users,
    @Body() body: CreateCategoryOrderDto,
  ) {
    try {
      const category = await this.categoryService.create({
        ...body,
        createAt: new Date(),
        updateAt: new Date(),
        createBy: user_info.email,
        updateBy: '',
        active: true,
      });
      return new BaseResultData('201', category, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getPaymentTypeById(@Param('id') id: string) {
    try {
      const category = await this.categoryService.findOne({ id });

      return new BaseResultData('200', category, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async updateProductById(
    @Param('id') id: string,
    @Body() body: UpdateCategoryOrderDto,
    @GetUser() user_info: Users,
  ) {
    try {
      await this.categoryService.update(id, {
        ...body,
        updateBy: user_info.email,
        updateAt: new Date(),
      });

      const category = await this.categoryService.findOne({ id });

      return new BaseResultData('200', category, '', 'Success');
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
      const category = await this.categoryService.delete(id);

      return new BaseResultData(
        '200',
        category,
        '',
        'Success deleted successfully',
      );
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
