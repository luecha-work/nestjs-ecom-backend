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
import { CreateParcelStatusDto } from './dto/create-parcel-status.dto';
import { UpdateParcelStatusDto } from './dto/update-parcel-status.dto';
import { ParcelStatusService } from './parcel-status.service';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard())
@ApiTags('parcel-status')
@Controller('parcel-status')
export class ParcelStatusController {
  constructor(private readonly parcelStatusService: ParcelStatusService) {}

  @Get()
  async paginatePage(@Query('page') page: number, @GetUser() user_info: Users) {
    try {
      // const parcelStatus: any = await this.parcelStatusService.paginate(page);
      const parcelStatus: any =
        await this.parcelStatusService.findParcelStatus();

      return new BaseResultData('200', parcelStatus, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('order-success')
  async getParcelStatusOnOrderSuccess(@GetUser() user_info: Users) {
    try {
      const parcelStatus: any =
        await this.parcelStatusService.findParcelStatusOnOrderSuccess();

      return new BaseResultData('200', parcelStatus, '', 'Success');
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
    @Body() body: CreateParcelStatusDto,
  ) {
    try {
      const parcelStatus = await this.parcelStatusService.create({
        ...body,
        createAt: new Date(),
        updateAt: new Date(),
        createBy: user_info.email,
        updateBy: '',
      });
      return new BaseResultData('201', parcelStatus, '', 'Success');
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
      const parcelStatus = await this.parcelStatusService.findOne({ id });

      return new BaseResultData('200', parcelStatus, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  // @HasPermission('users')
  async updateProductById(
    @Param('id') id: string,
    @Body() body: UpdateParcelStatusDto,
    @GetUser() user_info: Users,
  ) {
    try {
      await this.parcelStatusService.update(id, {
        ...body,
        updateBy: user_info.email,
        updateAt: new Date(),
      });

      const orderStatus = await this.parcelStatusService.findOne({ id });

      return new BaseResultData('200', orderStatus, '', 'Success');
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
      await this.parcelStatusService.delete(id);

      return new BaseResultData('200', [], '', 'Success deleted successfully');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
