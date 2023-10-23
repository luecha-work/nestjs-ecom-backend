import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from '../common/abstract.service';
import { Repository } from 'typeorm';
import { Market } from 'src/db/entities/Market';
import { BaseResultError } from '../common/base-result-error.interface';

@Injectable()
export class MarketService extends AbstractService {
  private logger = new Logger('marketService');
  constructor(
    @InjectRepository(Market)
    private readonly marketRepository: Repository<Market>,
  ) {
    super(marketRepository);
  }

  async getAllDetail() {
    return await this.marketRepository.find();
  }

  async getMarketByOrder(orderId: string): Promise<Market> {
    try {
      const order = await this.marketRepository
        .createQueryBuilder('market')
        .leftJoin('market.products', 'products')
        .leftJoin('products.productOrder', 'order')
        .where('order.id = :orderId', { orderId })
        .getOne();

      return order;
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findMarketById(marketId: string) {
    try {
      return await this.marketRepository.findOne({
        where: { id: marketId },
      });
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findMarketByCurrenUser(userInfo: string) {
    try {
      return await this.marketRepository
        .createQueryBuilder('market')
        .leftJoin('market.adminMarkets', 'adminMarkets')
        .leftJoin('adminMarkets.users', 'users')
        .where('users.id = :users', { users: userInfo })
        .getOne();
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findUsersListInMarket(marketId: string) {
    try {
      const usersList = await this.marketRepository
        .createQueryBuilder('market')
        .select(['users.id AS userId'])
        .leftJoin('market.adminMarkets', 'adminMarkets')
        .leftJoin('adminMarkets.users', 'users')
        .leftJoin('users.role', 'role')
        .where('market.id = :market', { market: marketId })
        .getRawMany();

      let newUserIds = [];
      for (const user of usersList) {
        newUserIds.push(user.userid);
      }

      return { userId: newUserIds };
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findUsersInMarket(marketId: string, page: number = 1) {
    const take = 8;
    try {
      const queryBuilder = this.marketRepository
        .createQueryBuilder('market')
        .leftJoinAndSelect('market.adminMarkets', 'adminMarkets')
        .leftJoinAndSelect('adminMarkets.users', 'users')
        .leftJoinAndSelect('users.role', 'role')
        .where('market.id = :market', { market: marketId });

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
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
