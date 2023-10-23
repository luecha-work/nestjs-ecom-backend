import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, In, Repository, SelectQueryBuilder } from 'typeorm';
import { Order } from 'src/db/entities/Order';
import { AbstractService } from '../common/abstract.service';
import { PaginatedResult } from '../common/paginated-result.interface';
import { Cart } from 'src/db/entities/Cart';
import { BaseResultError } from '../common/base-result-error.interface';

@Injectable()
export class ProductOrderService extends AbstractService {
  private logger = new Logger('ProductService');
  constructor(
    @InjectRepository(Order)
    private readonly productorderRepository: Repository<Order>,
  ) {
    super(productorderRepository);
  }

  async getAllDetail() {
    return await this.productorderRepository.find();
  }

  async getOrderByUserInfo(userId: string) {
    try {
      let orderIdList = [];
      const orders = await this.productorderRepository.find({
        where: { userid: userId },
      });

      for (const order of orders) {
        orderIdList.push(order.id);
      }

      return orderIdList;
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getByUserId(userId: string, page: number = 1, relations = []) {
    const take = 8;
    const [data, total] = await this.productorderRepository.findAndCount({
      take,
      skip: (page - 1) * take,
      where: {
        userid: userId,
      },
      order: { createAt: 'DESC' },
      relations,
    });

    return {
      data: data,
      meta: {
        total,
        page,
        last_page: Math.ceil(total / take),
      },
    };
  }

  async paginateOrders(
    search: string,
    relations = [],
    page: number = 1,
  ): Promise<PaginatedResult> {
    const take = 8;

    let whereClause: ((qb: SelectQueryBuilder<Order>) => void) | undefined =
      undefined;

    if (search !== '') {
      whereClause = (qb: SelectQueryBuilder<Order>) => {
        qb.where(
          new Brackets((brackets) => {
            brackets.where('LOWER(phone_number) LIKE LOWER(:phoneNumber)', {
              phoneNumber: `%${search.toLowerCase()}%`,
            });
            brackets.orWhere('LOWER(recipient) LIKE LOWER(:recip)', {
              recip: `%${search.toLowerCase()}%`,
            });
          }),
        );
      };
    }

    const [data, total] = await this.productorderRepository.findAndCount({
      take,
      skip: (page - 1) * take,
      where: whereClause,
      order: { createAt: 'ASC' },
      relations,
    });

    return {
      data: data,
      meta: {
        total,
        page,
        last_page: Math.ceil(total / take),
      },
    };
  }

  async orderCheckPayment(search: string, user_info: string, page: number = 1) {
    const take = 8;

    let whereClause: ((qb: SelectQueryBuilder<Order>) => void) | undefined =
      undefined;

    if (search !== '') {
      whereClause = (qb: SelectQueryBuilder<Order>) => {
        qb.where(
          new Brackets((brackets) => {
            brackets.where(
              'LOWER(order.phone_number) LIKE LOWER(:phoneNumber)',
              {
                phoneNumber: `%${search.toLowerCase()}%`,
              },
            );
            brackets.orWhere('LOWER(order.recipient) LIKE LOWER(:recip)', {
              recip: `%${search.toLowerCase()}%`,
            });
          }),
        );
      };
    }

    const queryBuilder = this.productorderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.paymentType', 'paymentType')
      .leftJoinAndSelect('order.orderStatus', 'orderStatus')
      .leftJoinAndSelect('order.parcelStatus', 'parcelStatus')
      .leftJoinAndSelect('order.products', 'products')
      .leftJoinAndSelect('order.parcelDelivery', 'parcelDelivery')
      .leftJoin('products.market', 'market')
      .leftJoin('market.adminMarkets', 'adminMarkets')
      .leftJoin('adminMarkets.users', 'users')
      .where('users.id = :user_info', { user_info })
      .andWhere('orderStatus.orderStatusName = :OSName', {
        OSName: 'รอตรวจสอบ',
      })
      .orderBy('order.createAt', 'DESC');

    if (whereClause) {
      queryBuilder.andWhere(new Brackets(whereClause));
    }

    const [data, total] = await queryBuilder
      .take(take)
      .skip((page - 1) * take)
      .getManyAndCount();

    return {
      data: data,
      meta: {
        total,
        page,
        last_page: Math.ceil(total / take),
      },
    };
  }

  async ordersPending(search: string, user_info: string, page: number = 1) {
    const take = 10;

    let whereClause: ((qb: SelectQueryBuilder<Order>) => void) | undefined =
      undefined;

    if (search !== '') {
      whereClause = (qb: SelectQueryBuilder<Order>) => {
        qb.where(
          new Brackets((brackets) => {
            brackets.where(
              'LOWER(order.phone_number) LIKE LOWER(:phoneNumber)',
              {
                phoneNumber: `%${search.toLowerCase()}%`,
              },
            );
            brackets.orWhere('LOWER(order.recipient) LIKE LOWER(:recip)', {
              recip: `%${search.toLowerCase()}%`,
            });
          }),
        );
      };
    }

    const queryBuilder = this.productorderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.paymentType', 'paymentType')
      .leftJoinAndSelect('order.orderStatus', 'orderStatus')
      .leftJoinAndSelect('order.parcelStatus', 'parcelStatus')
      .leftJoinAndSelect('order.products', 'products')
      .leftJoinAndSelect('order.parcelDelivery', 'parcelDelivery')
      .leftJoin('products.market', 'market')
      .leftJoin('market.adminMarkets', 'adminMarkets')
      .leftJoin('adminMarkets.users', 'users')
      .where('users.id = :user_info', { user_info })
      .andWhere('orderStatus.orderStatusName in (:...OSName)', {
        OSName: ['ชำระสำเร็จ', 'เก็บเงินปลายทาง'],
      })
      .andWhere('parcelStatus.parcelStatusName not in (:...PSName)', {
        PSName: ['จัดส่งไม่สำเร็จ', 'จัดส่งสำเร็จ'],
      })
      .orderBy('order.createAt', 'DESC');

    if (whereClause) {
      queryBuilder.andWhere(new Brackets(whereClause));
    }

    const [data, total] = await queryBuilder
      .take(take)
      .skip((page - 1) * take)
      .getManyAndCount();

    return {
      data: data,
      meta: {
        total,
        page,
        last_page: Math.ceil(total / take),
      },
    };
  }

  async ordersSuccess(
    search: string,
    searchCompany: string,
    user_info: string,
    page: number = 1,
  ) {
    const take = 8;

    let whereClause: ((qb: SelectQueryBuilder<Order>) => void) | undefined =
      undefined;

    let whereCompany: ((qb: SelectQueryBuilder<Order>) => void) | undefined =
      undefined;

    if (search !== '') {
      whereClause = (qb: SelectQueryBuilder<Order>) => {
        qb.where(
          new Brackets((brackets) => {
            brackets.where(
              'LOWER(order.phone_number) LIKE LOWER(:phoneNumber)',
              {
                phoneNumber: `%${search.toLowerCase()}%`,
              },
            );
            brackets.orWhere('LOWER(order.recipient) LIKE LOWER(:recip)', {
              recip: `%${search.toLowerCase()}%`,
            });
          }),
        );
      };
    }

    if (searchCompany !== '') {
      whereCompany = (qb: SelectQueryBuilder<Order>) => {
        qb.where(
          new Brackets((brackets) => {
            brackets.where(
              'parcelDelivery.transportCompany LIKE :searchCompany',
              {
                searchCompany: `%${searchCompany}%`,
              },
            );
          }),
        );
      };
    }

    const queryBuilder = this.productorderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.paymentType', 'paymentType')
      .leftJoinAndSelect('order.orderStatus', 'orderStatus')
      .leftJoinAndSelect('order.parcelStatus', 'parcelStatus')
      .leftJoinAndSelect('order.products', 'products')
      .leftJoinAndSelect('order.parcelDelivery', 'parcelDelivery')
      .leftJoin('products.market', 'market')
      .leftJoin('market.adminMarkets', 'adminMarkets')
      .leftJoin('adminMarkets.users', 'users')
      .where('users.id = :user_info', { user_info })
      .andWhere('parcelStatus.parcelStatusName = :PSName1', {
        PSName1: 'จัดส่งสำเร็จ',
      })

      .orderBy('order.createAt', 'DESC');

    if (whereClause) {
      queryBuilder.andWhere(new Brackets(whereClause));
    }

    if (whereCompany) {
      queryBuilder.andWhere(new Brackets(whereCompany));
    }

    const [data, total] = await queryBuilder
      .take(take)
      .skip((page - 1) * take)
      .getManyAndCount();

    return {
      data: data,
      meta: {
        total,
        page,
        last_page: Math.ceil(total / take),
      },
    };
  }

  async dashbordSalesOverallOld(
    filter: string,
    startDatePam: string = '',
    endDatePam: string = '',
  ) {
    let startDate: Date;
    let endDate: Date;

    let sumTotalAmount: number = 0;
    let sumOrderAmount: number = 0;
    let averageSales;

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // กำหนดวันเริ่มต้นและสิ้นสุดตามเงื่อนไข
    if (filter === 'day') {
      startDate = currentDate;
      endDate = new Date(currentDate);
      startDate.setDate(startDate.getDate() - 1);
      endDate.setDate(endDate.getDate() - 1);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
    } else if (filter === 'week') {
      endDate = new Date(currentDate);
      endDate.setDate(currentDate.getDate() - ((currentDate.getDay() + 7) % 7));

      // หาวันอาทิตย์สุดท้ายของสัปดาห์ที่ผ่านมา
      startDate = new Date(endDate);
      startDate.setDate(endDate.getDate() - 7); // ส่วนของการลบ 6 วันเพื่อให้เริ่มต้นที่วันอาทิตย์

      // กำหนดเวลาให้เริ่มต้นที่เท่ากับเวลา 00:00:00 และสิ้นสุดที่เท่ากับเวลา 23:59:59.999
      startDate.setHours(23, 59, 59, 999);
      endDate.setHours(23, 59, 59, 999);
    } else if (filter === 'month') {
      const monthStartDate = new Date(currentDate);
      monthStartDate.setMonth(currentDate.getMonth() - 1);
      monthStartDate.setDate(1);
      startDate = monthStartDate;

      const nextMonthStartDate = new Date(currentDate);
      nextMonthStartDate.setMonth(currentDate.getMonth() - 1);
      nextMonthStartDate.setDate(0);
      endDate = new Date(nextMonthStartDate);
      endDate.setMonth(currentDate.getMonth() - 1);
      endDate.setHours(23, 59, 59, 999); // เวลาสุดท้ายของวัน
    } else if (filter === 'year') {
      // หาวันที่ 1 ของเดือนมกราคมของปีที่ผ่านมา
      startDate = new Date(currentDate);
      startDate.setMonth(0, 1);
      startDate.setFullYear(startDate.getFullYear() - 1);

      // หาวันสุดท้ายของเดือนธันวาคมของปีที่ผ่านมา
      endDate = new Date(currentDate);
      endDate.setMonth(11, 31);
      endDate.setFullYear(endDate.getFullYear() - 1);
    } else {
      startDate = new Date(startDatePam);
      endDate = new Date(endDatePam);

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      startDate.setFullYear(startDate.getFullYear() - 1);
      endDate.setFullYear(endDate.getFullYear() - 1);
    }

    const orders = await this.productorderRepository
      .createQueryBuilder('order')
      .where('order.createAt >= :startDate', { startDate })
      .andWhere('order.createAt <= :endDate', { endDate })
      .orderBy('order.createAt', 'ASC')
      .getMany();

    const order = orders.map((order) => {
      sumTotalAmount += order.totalAmount;
      sumOrderAmount += order.ordersAmount;
    });
    if (sumOrderAmount <= 0 && sumTotalAmount <= 0) {
      averageSales = 0;
    } else {
      averageSales = parseFloat((sumTotalAmount / sumOrderAmount).toFixed(2));
    }

    return { sumTotalAmount, sumOrderAmount, averageSales };
  }

  async dashbordSalesOverall(
    filter: string,
    startDatePam: string = '',
    endDatePam: string = '',
  ) {
    let dataX;
    let sumTotalAmount: number = 0;
    let sumOrderAmount: number = 0;
    let averageSales;

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // ตั้งเวลาเป็นเที่ยงคืน

    let startDate: Date;
    let endDate: Date;

    if (filter === 'day') {
      startDate = currentDate;
      endDate = new Date(currentDate);
      endDate.setHours(23, 59, 59, 999); // เวลาสุดท้ายของวัน
    } else if (filter === 'week') {
      const weekStartDate = new Date(currentDate);
      weekStartDate.setDate(currentDate.getDate() - currentDate.getDay()); // วันแรกของสัปดาห์
      startDate = weekStartDate;
      endDate = new Date(currentDate);
      endDate.setDate(currentDate.getDate() + (7 - currentDate.getDay())); // วันสุดท้ายของสัปดาห์
      startDate.setHours(23, 59, 59, 999);
      endDate.setHours(23, 59, 59, 999); // เวลาสุดท้ายของวัน
    } else if (filter === 'month') {
      const monthStartDate = new Date(currentDate);
      monthStartDate.setDate(1); // วันแรกของเดือน
      startDate = monthStartDate;
      const nextMonthStartDate = new Date(currentDate);
      nextMonthStartDate.setMonth(currentDate.getMonth() + 1); // วันแรกของเดือนถัดไป
      nextMonthStartDate.setDate(0); // วันสุดท้ายของเดือนปัจจุบัน
      endDate = new Date(nextMonthStartDate);
      endDate.setHours(23, 59, 59, 999); // เวลาสุดท้ายของวัน
    } else if (filter === 'year') {
      const yearStartDate = new Date(currentDate.getFullYear(), 0, 1); // วันแรกของปี
      startDate = yearStartDate;
      const yearEndDate = new Date(
        currentDate.getFullYear(),
        11,
        31,
        23,
        59,
        59,
        999,
      ); // วันสุดท้ายของปี
      endDate = yearEndDate;
    } else {
      startDate = new Date(startDatePam);
      endDate = new Date(endDatePam);

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
    }

    const orders = await this.productorderRepository
      .createQueryBuilder('order')
      .where('order.createAt >= :startDate', { startDate })
      .andWhere('order.createAt <= :endDate', { endDate })
      .orderBy('order.createAt', 'ASC')
      .getMany();

    if (filter === 'day') {
      dataX = orders.map((order) => {
        const createAtDate = new Date(order.createAt);
        const hours = createAtDate.getHours().toString().padStart(2, '0');
        const minutes = createAtDate.getMinutes().toString().padStart(2, '0');
        const seconds = createAtDate.getSeconds().toString().padStart(2, '0');

        return `${hours}:${minutes}:${seconds}`;
      });
    } else {
      dataX = orders.map((order) => {
        const createAtDate = new Date(order.createAt);
        const day = createAtDate.getDate().toString().padStart(2, '0');
        const month = (createAtDate.getMonth() + 1).toString().padStart(2, '0');
        const year = createAtDate.getFullYear().toString();
        const hours = createAtDate.getHours().toString().padStart(2, '0');
        const minutes = createAtDate.getMinutes().toString().padStart(2, '0');
        const seconds = createAtDate.getSeconds().toString().padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
      });
    }

    const dataY = orders.map((order) => {
      sumTotalAmount += order.totalAmount;
      sumOrderAmount += order.ordersAmount;

      return order.ordersAmount;
    });

    averageSales = parseFloat((sumTotalAmount / sumOrderAmount).toFixed(2));

    return { dataX, dataY, sumTotalAmount, sumOrderAmount, averageSales };
  }

  async dashbordSalesByCategory(
    filter: string,
    startDatePam: string = '',
    endDatePam: string = '',
  ) {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // ตั้งเวลาเป็นเที่ยงคืน

    let startDate: Date;
    let endDate: Date;

    if (filter === 'day') {
      startDate = currentDate;
      endDate = new Date(currentDate);
      endDate.setHours(23, 59, 59, 999); // เวลาสุดท้ายของวัน
    } else if (filter === 'week') {
      const weekStartDate = new Date(currentDate);
      weekStartDate.setDate(currentDate.getDate() - currentDate.getDay()); // วันแรกของสัปดาห์
      startDate = weekStartDate;
      endDate = new Date(currentDate);
      endDate.setDate(currentDate.getDate() + (6 - currentDate.getDay())); // วันสุดท้ายของสัปดาห์
      startDate.setHours(23, 59, 59, 999);
      endDate.setHours(23, 59, 59, 999); // เวลาสุดท้ายของวัน
    } else if (filter === 'month') {
      const monthStartDate = new Date(currentDate);
      monthStartDate.setDate(1); // วันแรกของเดือน
      startDate = monthStartDate;
      const nextMonthStartDate = new Date(currentDate);
      nextMonthStartDate.setMonth(currentDate.getMonth() + 1); // วันแรกของเดือนถัดไป
      nextMonthStartDate.setDate(0); // วันสุดท้ายของเดือนปัจจุบัน
      endDate = new Date(nextMonthStartDate);
      endDate.setHours(23, 59, 59, 999); // เวลาสุดท้ายของวัน
    } else if (filter === 'year') {
      const yearStartDate = new Date(currentDate.getFullYear(), 0, 1); // วันแรกของปี
      startDate = yearStartDate;
      const yearEndDate = new Date(
        currentDate.getFullYear(),
        11,
        31,
        23,
        59,
        59,
        999,
      ); // วันสุดท้ายของปี
      endDate = yearEndDate;
    } else {
      startDate = new Date(startDatePam);
      endDate = new Date(endDatePam);

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
    }

    const orders = await this.productorderRepository
      .createQueryBuilder('order')
      .select([
        'category.id AS categoryId',
        'category.categoryName AS categoryName',
        'ROUND(SUM(order.totalAmount), 2) AS totalAmount',
        'ROUND(SUM(order.ordersAmount), 2) AS ordersAmount',
      ])
      .leftJoin('order.products', 'products')
      .leftJoin('products.category', 'category')
      .where('order.createAt >= :startDate', { startDate })
      .andWhere('order.createAt <= :endDate', { endDate })
      .groupBy('category.id, category.categoryName')
      .getRawMany();

    for (const order of orders) {
      const totalAmount = parseFloat(order.totalamount);
      const ordersAmount = parseFloat(order.ordersamount);

      order.averageSales = (totalAmount / ordersAmount).toFixed(2);
    }

    return orders;
  }

  async dashbordRepeatPurchase(
    filter: string,
    startDatePam: string = '',
    endDatePam: string = '',
  ) {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // ตั้งเวลาเป็นเที่ยงคืน

    let startDate: Date;
    let endDate: Date;

    if (filter === 'day') {
      startDate = currentDate;
      endDate = new Date(currentDate);
      endDate.setHours(23, 59, 59, 999); // เวลาสุดท้ายของวัน
    } else if (filter === 'week') {
      const weekStartDate = new Date(currentDate);
      weekStartDate.setDate(currentDate.getDate() - currentDate.getDay()); // วันแรกของสัปดาห์
      startDate = weekStartDate;
      endDate = new Date(currentDate);
      endDate.setDate(currentDate.getDate() + (6 - currentDate.getDay())); // วันสุดท้ายของสัปดาห์
      startDate.setHours(23, 59, 59, 999);
      endDate.setHours(23, 59, 59, 999); // เวลาสุดท้ายของวัน
    } else if (filter === 'month') {
      const monthStartDate = new Date(currentDate);
      monthStartDate.setDate(1); // วันแรกของเดือน
      startDate = monthStartDate;
      const nextMonthStartDate = new Date(currentDate);
      nextMonthStartDate.setMonth(currentDate.getMonth() + 1); // วันแรกของเดือนถัดไป
      nextMonthStartDate.setDate(0); // วันสุดท้ายของเดือนปัจจุบัน
      endDate = new Date(nextMonthStartDate);
      endDate.setHours(23, 59, 59, 999); // เวลาสุดท้ายของวัน
    } else if (filter === 'year') {
      const yearStartDate = new Date(currentDate.getFullYear(), 0, 1); // วันแรกของปี
      startDate = yearStartDate;
      const yearEndDate = new Date(
        currentDate.getFullYear(),
        11,
        31,
        23,
        59,
        59,
        999,
      ); // วันสุดท้ายของปี
      endDate = yearEndDate;
    } else {
      startDate = new Date(startDatePam);
      endDate = new Date(endDatePam);

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
    }

    const orders = await this.productorderRepository
      .createQueryBuilder('order')
      .select([
        'products.productCode AS productCode',
        'products.productName AS productName',
        'SUM(order.ordersAmount) AS sumOrder',
      ])
      .leftJoin('order.products', 'products')
      .leftJoin('products.category', 'category')
      .where('order.createAt >= :startDate', { startDate })
      .andWhere('order.createAt <= :endDate', { endDate })
      .groupBy('products.id, products.productName')
      .getRawMany();

    return orders;
  }

  async cancelCreateOrder(id: string) {
    const orders = await this.productorderRepository
      .createQueryBuilder()
      .update(Cart)
      .set({ cfProduct: false })
      .where('users = :id', { id })
      .execute();
  }
  async getMaxOrderProducts(is_most_sales: boolean) {
    const productsIdGroupBy = await this.productorderRepository
      .createQueryBuilder('order')
      .leftJoin('order.products', 'products')
      .select(['products.id AS "productId"', 'COUNT(*) AS orderCount'])
      .groupBy('products.id')
      .orderBy('orderCount', is_most_sales === true ? 'DESC' : 'ASC')
      .limit(5)
      .getRawMany();
    return productsIdGroupBy;
  }
}
