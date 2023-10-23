import { CategoryProduct } from 'src/db/entities/CategoryProduct';
import { AbstractService } from '../common/abstract.service';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryProductService extends AbstractService {
  private logger = new Logger('CategoryProductService');

  constructor(
    @InjectRepository(CategoryProduct)
    private readonly categoryRepository: Repository<CategoryProduct>,
  ) {
    super(categoryRepository);
  }

  async findCategoryProduct() {
    try {
      return await this.categoryRepository
        .createQueryBuilder('category_product')
        // .where('active = :active', { active: true })
        .orderBy('category_product.categoryCode', 'ASC')
        .getMany();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findToDashboard() {
    try {
      return await this.categoryRepository
        .createQueryBuilder('category_product')
        .select([
          'category_product.id AS categoryId',
          'category_product.categoryName AS categoryName',
        ])
        .orderBy('category_product.categoryName', 'ASC')
        .getRawMany();
    } catch (error) {
      throw new Error(error);
    }
  }
}
