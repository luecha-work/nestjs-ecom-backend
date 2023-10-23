import { Notifications } from 'src/db/entities/Notifications';
import { AbstractService } from '../common/abstract.service';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { BaseResultError } from '../common/base-result-error.interface';

@Injectable()
export class NotificationsService extends AbstractService {
  private logger = new Logger('NotificationsService');
  constructor(
    @InjectRepository(Notifications)
    private readonly notificationsRepository: Repository<Notifications>,
  ) {
    super(notificationsRepository);
  }

  async checkProductExpirationToCreate() {}

  async countNotifications(marketId: string, orderIdList: string[] = []) {
    const number = await this.notificationsRepository.count({
      where: [
        { isviewed: false, marketId },
        { isviewed: false, orderId: In(orderIdList) },
      ],
    });

    return { number: number };
  }

  async findAllByUser(marketId: string, orderIdList: string[] = []) {
    return await this.notificationsRepository.find({
      where: [
        { isviewed: false, marketId },
        { isviewed: false, orderId: In(orderIdList) },
      ],
    });
  }

  async createNotification(
    email: string,
    title: string,
    message: string,
    order_id: string,
    marget_id: string,
  ) {
    let orderId = null;
    let marketId = null;
    try {
      if (order_id !== '' || order_id !== undefined || order_id !== null) {
        orderId = order_id;
      }

      if (marget_id !== '' || marget_id !== undefined || marget_id !== null) {
        marketId = marget_id;
      }

      const notification: any = await this.notificationsRepository.save({
        title,
        message,
        marketId,
        orderId,
        isviewed: false,
        createAt: new Date(),
        updateAt: new Date(),
        createBy: email,
        updateBy: '',
      });

      return notification;
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
