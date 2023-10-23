import { AbstractService } from '../common/abstract.service';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatus } from 'src/db/entities/OrderStatus';
import { Injectable, Logger } from '@nestjs/common';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class OrderStatusService extends AbstractService {
  private logger = new Logger('OrderStatusService');

  constructor(
    @InjectRepository(OrderStatus)
    private readonly orderStatusRepository: Repository<OrderStatus>,
  ) {
    super(orderStatusRepository);
  }

  async findOrdersStatus(action: string) {
    console.log(`findOrdersStatus: ${action}`);
    let whereClause:
      | ((qb: SelectQueryBuilder<OrderStatus>) => void)
      | undefined = undefined;

    if (action === 'edit') {
      whereClause = (qb: SelectQueryBuilder<OrderStatus>) => {
        qb.where('order_status.orderStatusName = :status1', {
          status1: 'รอตรวจสอบ',
        });
        qb.orWhere('order_status.orderStatusName = :status2', {
          status2: 'ชำระสำเร็จ',
        });
        qb.orWhere('order_status.orderStatusName = :status3', {
          status3: 'เก็บเงินปลายทาง',
        });
      };
    } else if (action === 'delete') {
      whereClause = (qb: SelectQueryBuilder<OrderStatus>) => {
        qb.orWhere('order_status.orderStatusName = :status2', {
          status2: 'แนบรูปภาพที่ไม่เกี่ยวข้อง',
        });
        qb.orWhere('order_status.orderStatusName = :status3', {
          status3: 'สลิปปลอมไม่มียอดเงินเข้า',
        });
        qb.orWhere('order_status.orderStatusName = :status4', {
          status4: 'สลิปไม่ตรงกับยอดเงินที่โอนเข้า',
        });
      };
    }

    const queryBuilder = this.orderStatusRepository
      .createQueryBuilder('order_status')
      .orderBy('order_status.orderStatusCode', 'ASC');

    if (whereClause) {
      queryBuilder.andWhere(new Brackets(whereClause));
    }

    return await queryBuilder.getMany();
  }

  private async onModuleInit() {
    try {
      this.logger.warn(`starting check data in role entity to create role`);
      const initialDataExists = await this.checkInitialData();
      if (!initialDataExists) {
        await this.createInitialData();
      }
    } catch (error) {}
  }

  private async checkInitialData(): Promise<boolean> {
    try {
      const count = await this.orderStatusRepository.count();
      return count > 0;
    } catch (error) {}
  }

  private async createInitialData(): Promise<void> {
    try {
      const orderStatus1 = {
        orderStatusName: 'รอตรวจสอบ',
        orderStatusCode: 'OS00001',
        description: '',
        createBy: 'system',
        updateBy: '',
        active: true,
        createAt: new Date(),
        updateAt: new Date(),
      };

      const orderStatus2 = {
        orderStatusName: 'ชำระสำเร็จ',
        orderStatusCode: 'OS00002',
        description: '',
        createBy: 'system',
        updateBy: '',
        active: true,
        createAt: new Date(),
        updateAt: new Date(),
      };

      const orderStatus3 = {
        orderStatusName: 'เก็บเงินปลายทาง',
        orderStatusCode: 'OS00003',
        description: '',
        createBy: 'system',
        updateBy: '',
        active: true,
        createAt: new Date(),
        updateAt: new Date(),
      };

      const orderStatus4 = {
        orderStatusName: 'แนบรูปภาพที่ไม่เกี่ยวข้อง',
        orderStatusCode: 'OS00004',
        description: '',
        createBy: 'system',
        updateBy: '',
        active: true,
        createAt: new Date(),
        updateAt: new Date(),
      };

      const orderStatus5 = {
        orderStatusName: 'สลิปปลอมไม่มียอดเงินเข้า',
        orderStatusCode: 'OS00005',
        description: '',
        createBy: 'system',
        updateBy: '',
        active: true,
        createAt: new Date(),
        updateAt: new Date(),
      };

      const orderStatus6 = {
        orderStatusName: 'สลิปไม่ตรงกับยอดเงินที่โอนเข้า',
        orderStatusCode: 'OS00006',
        description: '',
        createBy: 'system',
        updateBy: '',
        active: true,
        createAt: new Date(),
        updateAt: new Date(),
      };

      await super.create(orderStatus1);
      await super.create(orderStatus2);
      await super.create(orderStatus3);
      await super.create(orderStatus4);
      await super.create(orderStatus5);
      await super.create(orderStatus6);

      const orderStatus = await this.orderStatusRepository.find();

      this.logger.warn(
        `Create ${
          orderStatus.length
        } order status in first starting project e-commerce-backend ${JSON.stringify(
          orderStatus,
        )}`,
      );
    } catch (error) {}
  }
}
