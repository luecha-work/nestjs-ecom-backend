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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Users } from 'src/db/entities/Users';
import { GetUser } from 'src/modules/auth/decorator/get-user.decorator';
import { BaseResultError } from '../common/base-result-error.interface';
import { BaseResultData } from '../common/base-result.interface';
import { MarketService } from './../market/market.service';
import { ProductOrderService } from './../order/order.service';
import { UserService } from './../user/user.service';
import { CreateNotificationsDto } from './dto/create-notifications.dto';
import { UpdateNotificationsDto } from './dto/update-notifications.dto';
import { NotificationsService } from './notifications.service';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard())
@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly userService: UserService,
    private readonly marketService: MarketService,
    private readonly orderService: ProductOrderService,
  ) {}

  @Get()
  async findAllByUser(@GetUser() user_info: Users) {
    let orderIdList = [];
    let marketId = null;

    try {
      const roleCode: number = await this.userService.findRoleCodeByUserInfo(
        user_info?.id,
      );

      if (roleCode === 2) {
        const market = await this.marketService.findMarketByCurrenUser(
          user_info?.id,
        );

        marketId = market?.id;
      } else if (roleCode === 3) {
        const ordersId = await this.orderService.getOrderByUserInfo(
          user_info?.id,
        );

        orderIdList = ordersId;
      }

      const notifications: any = await this.notificationsService.findAllByUser(
        marketId,
        orderIdList,
      );

      return new BaseResultData('200', notifications, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('get-amount')
  async countNotifications(@GetUser() user_info: Users) {
    let orderIdList = [];
    let marketId = null;

    try {
      const roleCode: number = await this.userService.findRoleCodeByUserInfo(
        user_info?.id,
      );

      if (roleCode === 2) {
        const market = await this.marketService.findMarketByCurrenUser(
          user_info?.id,
        );

        marketId = market?.id;
      } else if (roleCode === 3) {
        const ordersId = await this.orderService.getOrderByUserInfo(
          user_info?.id,
        );

        orderIdList = ordersId;
      }

      const numberNotifications: any =
        await this.notificationsService.countNotifications(
          marketId,
          orderIdList,
        );

      return new BaseResultData('200', numberNotifications, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getNotificationById(@Param('id') id: string) {
    try {
      const notification = await this.notificationsService.findOne({ id });

      return new BaseResultData('200', notification, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async createNotification(
    @GetUser() user_info: Users,
    @Body() body: CreateNotificationsDto,
  ) {
    let order_id = null;
    let market_id = null;

    const { title, message, orderId } = body;

    try {
      const roleCode: number = await this.userService.findRoleCodeByUserInfo(
        user_info?.id,
      );

      if (roleCode === 2 && orderId === '') {
        const market = await this.marketService.findMarketByCurrenUser(
          user_info?.id,
        );
        market_id = market?.id;
      }
      // else if (roleCode === 3) {
      //   // orderId = user_info?.id;
      // }

      const notification = await this.notificationsService.createNotification(
        user_info.email,
        title,
        message,
        orderId,
        market_id,
      );

      // const notification = await this.notificationsService.create({
      //   ...body,
      //   orderId: orderId,
      //   marketId: market_id,
      //   isviewed: false,
      //   createAt: new Date(),
      //   updateAt: new Date(),
      //   createBy: user_info.email,
      //   updateBy: '',
      // });
      return new BaseResultData('201', notification, '', 'Success');
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
    @Body() body: UpdateNotificationsDto,
    @GetUser() user_info: Users,
  ) {
    try {
      await this.notificationsService.update(id, {
        ...body,
        updateBy: user_info.email,
        updateAt: new Date(),
      });

      const notification = await this.notificationsService.findOne({ id });

      return new BaseResultData('200', notification, '', 'Success');
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
      await this.notificationsService.delete(id);

      return new BaseResultData('200', [], '', 'Success deleted successfully');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
