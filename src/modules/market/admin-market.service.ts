import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from '../common/abstract.service';
import { Repository } from 'typeorm';
import { BaseResultError } from '../common/base-result-error.interface';
import { AdminMarket } from 'src/db/entities/AdminMarket';

@Injectable()
export class AdminMarketService extends AbstractService {
  private logger = new Logger('AdminMarketService');
  constructor(
    @InjectRepository(AdminMarket)
    private readonly adminMarketRepository: Repository<AdminMarket>,
  ) {
    super(adminMarketRepository);
  }

  async getAllDetail() {
    return await this.adminMarketRepository.find();
  }

  async findMarketById(marketId: string) {
    try {
      return await this.adminMarketRepository.findOne({
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
      return await this.adminMarketRepository
        .createQueryBuilder('market')
        .leftJoinAndSelect('market.users', 'users')
        .where('users.id = :users', { users: userInfo })
        .getOne();
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
