import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Users } from 'src/db/entities/Users';
import { GetUser } from 'src/modules/auth/decorator/get-user.decorator';
import { BaseResultError } from '../common/base-result-error.interface';
import { BaseResultData } from '../common/base-result.interface';
import { CreatePreferencesShow } from './dto/create-preferences-show.dto';
import { UpdatePreferencesShow } from './dto/update-preferences-show.dto';
import { PreferencesShowProductsService } from './preferences-show-products.service';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('preferences-show-products')
@Controller('preferences-show-products')
export class PreferencesShowProductsController {
  constructor(
    private readonly preferencesShowService: PreferencesShowProductsService,
  ) {}

  @Get('first-page')
  async getFirstPageSetting() {
    try {
      const preferencesShows = await this.preferencesShowService.findOne({
        isLoggedIn: false,
      });

      return new BaseResultData('200', preferencesShows, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthGuard())
  @Get('introduction-page')
  async getIntroductionPageSetting() {
    try {
      const preferencesShows = await this.preferencesShowService.findOne({
        isLoggedIn: true,
      });

      return new BaseResultData('200', preferencesShows, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthGuard())
  @Get()
  async all() {
    try {
      const preferencesShows = await this.preferencesShowService.all();

      return new BaseResultData('200', preferencesShows, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthGuard())
  @Post()
  async create(
    @Body() body: CreatePreferencesShow,
    @GetUser() user_info: Users,
  ) {
    try {
      const preferencesShow = await this.preferencesShowService.create({
        ...body,
        active: true,
        createBy: user_info.email,
        updateBy: '',
        createAt: new Date(),
        updateAt: new Date(),
      });

      return new BaseResultData('201', preferencesShow, '', 'Success created');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthGuard())
  @Get(':id')
  async getProductById(@Param('id') id: string) {
    try {
      const preferencesShow = await this.preferencesShowService.findOne({ id });

      return new BaseResultData('200', preferencesShow, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthGuard())
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdatePreferencesShow,
    @GetUser() user_info: Users,
  ) {
    try {
      await this.preferencesShowService.update(id, {
        ...body,
        updateBy: user_info.email,
        updateAt: new Date(),
      });

      const preferencesShow = await this.preferencesShowService.findOne({ id });

      return new BaseResultData('200', preferencesShow, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
