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
import { CreateParcelDeliveryDto } from '../parcel-delovery-detail/dto/create-parcel-delivery.dto';
import { UpdateParcelDeliveryDto } from '../parcel-delovery-detail/dto/update-parcel-delivery.dto';
import { BaseResultError } from './../common/base-result-error.interface';
import { BaseResultData } from './../common/base-result.interface';
import { ParcelDeliveryDetailService } from './parcel-delovery-detail.service';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard())
@ApiTags('parcel-delovery-detail')
@Controller('parcel-delovery-detail')
export class ParcelDeliveryDetailController {
  constructor(
    private readonly parcelDeliveryService: ParcelDeliveryDetailService,
  ) {}

  @Get()
  async paginateAllParcelDelivery(
    @Query('page') page: number,
    @Query('search') search: string,
  ) {
    try {
      let ParcelDelivery: any = await this.parcelDeliveryService.paginate(
        page,
        ['order'],
      );

      return new BaseResultData('200', ParcelDelivery, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async createParcelDelivery(
    @Body() body: CreateParcelDeliveryDto,
    @Query('order_id') orderId: string,
    @GetUser() user_info: Users,
  ) {
    try {
      const ParcelDelivery = await this.parcelDeliveryService.create({
        ...body,
        createAt: new Date(),
        updateAt: new Date(),
        transferDate: new Date(),
        createBy: user_info.email,
        updateBy: '',
      });
      return new BaseResultData('201', ParcelDelivery, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getParcelDeliveryById(@Param('id') id: string) {
    try {
      const ParcelDelivery = await this.parcelDeliveryService.findOne({ id }, [
        'products',
        'paymentType',
      ]);

      return new BaseResultData('200', ParcelDelivery, '', 'Success');
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
    @GetUser() user_info: Users,
    @Body() body: UpdateParcelDeliveryDto,
  ) {
    try {
      await this.parcelDeliveryService.update(id, {
        ...body,
        updateAt: new Date(),
        updateBy: user_info.email,
      });
      const ParcelDelivery = await this.parcelDeliveryService.findOne({ id });

      return new BaseResultData('200', ParcelDelivery, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      await this.parcelDeliveryService.delete(id);
      return new BaseResultData('200', [], '', 'Success deleted successfully');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
