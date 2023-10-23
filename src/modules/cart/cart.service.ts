import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from '../common/abstract.service';
import { BaseResultError } from '../common/base-result-error.interface';
import { Cart } from 'src/db/entities/Cart';
import { Repository } from 'typeorm';

@Injectable()
export class CartService extends AbstractService {
  private logger = new Logger('cartService');
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {
    super(cartRepository);
  }

  async findAllByUserId(userId: string, check: boolean) {
    try {
      let getCartById = this.cartRepository
        .createQueryBuilder('cart')
        .leftJoinAndSelect('cart.product', 'products')
        .leftJoinAndSelect('cart.productsOption', 'productsOption')
        .leftJoin('cart.users', 'users')
        .where(`users.id = :users `, {
          users: userId,
        });

      if (check) {
        getCartById.andWhere('cf_product = :checks', { checks: check });
      }

      return await getCartById.getMany();
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
