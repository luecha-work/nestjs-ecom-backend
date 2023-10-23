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
import { CreateOrderStatusDto } from './dto/create-order-status.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrderStatusService } from './order-status.service';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard())
@ApiTags('order-status')
@Controller('order-status')
export class OrderStatusController {
  constructor(private readonly orderStatusService: OrderStatusService) {}

  @Get()
  async paginatePage(@Query('action') action: string) {
    try {
      // const orderStatus: any = await this.orderStatusService.paginate(page);

      const orderStatus: any = await this.orderStatusService.findOrdersStatus(
        action,
      );

      return new BaseResultData('200', orderStatus, '', 'Success');
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
    @Body() body: CreateOrderStatusDto,
  ) {
    try {
      const orderStatus = await this.orderStatusService.create({
        ...body,
        createAt: new Date(),
        updateAt: new Date(),
        createBy: user_info.email,
        updateBy: '',
      });
      return new BaseResultData('201', orderStatus, '', 'Success');
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
      const orderStatus = await this.orderStatusService.findOne({ id });

      return new BaseResultData('200', orderStatus, '', 'Success');
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
    @Body() body: UpdateOrderStatusDto,
    @GetUser() user_info: Users,
  ) {
    try {
      await this.orderStatusService.update(id, {
        ...body,
        updateBy: user_info.email,
        updateAt: new Date(),
      });

      const orderStatus = await this.orderStatusService.findOne({ id });

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
      await this.orderStatusService.delete(id);

      return new BaseResultData('200', [], '', 'Success deleted successfully');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
