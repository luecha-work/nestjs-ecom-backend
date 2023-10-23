import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/db/entities/Products';
import { Brackets, In, Not, Repository, SelectQueryBuilder } from 'typeorm';
import { AbstractService } from '../common/abstract.service';

@Injectable()
export class ProductsService extends AbstractService {
  private logger = new Logger('ProductService');

  constructor(
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
  ) {
    super(productRepository);
  }

  async getAllDetail() {
    return await this.productRepository.find({ relations: ['market'] });
  }

  async getroductById(Id: string) {
    const data = await this.productRepository.findOne({ id: Id });
    return data;
  }

  async getRandomProduct() {
    const customQuery = `
    SELECT *
    FROM products
    ORDER BY random() asc
    LIMIT 5;
    `;
    const query_product = await this.productRepository.query(customQuery);

    const totalRecords = query_product.length;
    return { code: '000000', data: query_product, totalRecords: totalRecords };
  }

  async getProductbyCategoryId(id: string, page = 1, relations = []) {
    const take = 8;
    const [data, total] = await this.repository.findAndCount({
      take,
      skip: (page - 1) * take,
      where: { category: id },
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

  async getProductbySearch(
    search: string,
    categoryId: string,
    page: number = 1,
  ) {
    const take = 8;

    let whereClause: ((qb: SelectQueryBuilder<Products>) => void) | undefined =
      undefined;
    let whereCategory:
      | ((qb: SelectQueryBuilder<Products>) => void)
      | undefined = undefined;

    if (search !== '') {
      whereClause = (qb: SelectQueryBuilder<Products>) => {
        qb.where(
          new Brackets((brackets) => {
            brackets.where(
              'LOWER(products.productName) LIKE LOWER(:productName)',
              {
                productName: `%${search.toLowerCase()}%`,
              },
            );
            brackets.orWhere('LOWER(products.keyword) LIKE LOWER(:keyword)', {
              keyword: `%${search.toLowerCase()}%`,
            });
          }),
        );
      };
    }
    if (categoryId !== '') {
      whereCategory = (qb: SelectQueryBuilder<Products>) => {
        qb.where(
          new Brackets((brackets) => {
            brackets.where('category.id = :categoryId ', {
              categoryId: `${categoryId}`,
            });
          }),
        );
      };
    }

    const queryBuilder = this.productRepository
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.category', 'category')
      .orderBy('products.productName', 'ASC');

    if (whereClause) {
      queryBuilder.andWhere(new Brackets(whereClause));
    }
    if (whereCategory) {
      queryBuilder.andWhere(new Brackets(whereCategory));
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

  async findProductInCurrenUser(
    search: string,
    marketId: string,
    page: number = 1,
  ) {
    const take = 8;

    let whereClause: ((qb: SelectQueryBuilder<Products>) => void) | undefined =
      undefined;

    if (search !== '') {
      whereClause = (qb: SelectQueryBuilder<Products>) => {
        qb.where(
          new Brackets((brackets) => {
            brackets.where(
              'LOWER(products.productName) LIKE LOWER(:productName)',
              {
                productName: `%${search.toLowerCase()}%`,
              },
            );
            brackets.orWhere('LOWER(products.keyword) LIKE LOWER(:keyword)', {
              keyword: `%${search.toLowerCase()}%`,
            });
          }),
        );
      };
    }

    const queryBuilder = this.productRepository
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.category', 'category')
      .leftJoinAndSelect('products.market', 'market')
      .leftJoin('market.adminMarkets', 'adminMarkets')
      .leftJoin('adminMarkets.users', 'users')
      .where('market.id = :marketId', { marketId })
      .orderBy('products.productName', 'ASC');

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

  async findProductInListSettings(productList: any) {
    return await this.productRepository.find({
      where: productList.map((product) => ({ id: product.productId })),
    });
  }
  async getProductByView() {
    return await this.productRepository.find({
      order: {
        views: 'DESC',
      },
      take: 5,
    });
  }

  async getRandomProducts(
    count: number,
    productList: any[],
  ): Promise<Products[]> {
    const productIdsToExclude = productList.map((item) => item.productId);
    const allProducts = await this.productRepository.find({
      where: {
        id: Not(In(productIdsToExclude)),
      },
    });
    const randomProducts = this.getRandomItems(allProducts, count);
    return randomProducts;
  }

  private getRandomItems(items: Products[], count: number): Products[] {
    const shuffled = items.slice(0);
    const result = [];
    while (result.length < count && shuffled.length > 0) {
      const randomIndex = Math.floor(Math.random() * shuffled.length);
      const randomItem = shuffled.splice(randomIndex, 1)[0];
      result.push(randomItem);
    }
    return result;
  }
}
