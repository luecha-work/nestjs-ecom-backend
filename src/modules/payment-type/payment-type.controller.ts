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
import { BaseResultData } from './../common/base-result.interface';
import { CreatePaymentTypeDto } from './dto/create-payment-type.dto';
import { UpdatePaymentTypeDto } from './dto/update-payment-type.dto';
import { PaymentTypeService } from './payment-type.service';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard())
@ApiTags('payments-type')
@Controller('payments-type')
export class PaymentTypeController {
  constructor(private readonly paymentTypeService: PaymentTypeService) {}

  @Get()
  async paginatePage(@Query('page') page: number, @GetUser() user: Users) {
    try {
      const paymentType: any = await this.paymentTypeService.paginate(page);

      // const paymentType: any = await this.paymentTypeService.findPaymentType();

      return new BaseResultData('200', paymentType, '', 'Success');
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
    @Body() body: CreatePaymentTypeDto,
  ) {
    try {
      const paymentType = await this.paymentTypeService.create({
        ...body,
        createDate: new Date(),
        updateDate: new Date(),
        createBy: user_info.email,
        updateBy: '',
      });

      return new BaseResultData('201', paymentType, '', 'Success');
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
      const paymentType = await this.paymentTypeService.findOne({ id });

      return new BaseResultData('200', paymentType, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async updatePaymentTypeById(
    @Param('id') id: string,
    @Body() body: UpdatePaymentTypeDto,
    @GetUser() user_info: Users,
  ) {
    try {
      await this.paymentTypeService.update(id, {
        ...body,
        updateBy: user_info?.email,
        updateDate: new Date(),
      });

      const paymentType = await this.paymentTypeService.findOne({ id });

      return new BaseResultData('200', paymentType, '', 'Success');
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
      await this.paymentTypeService.delete(id);

      return new BaseResultData('200', [], '', 'Success deleted successfully');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
