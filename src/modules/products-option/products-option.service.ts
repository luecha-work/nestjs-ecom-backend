import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsOption } from 'src/db/entities/ProductOptions';
import { Repository } from 'typeorm';
import { AbstractService } from '../common/abstract.service';

@Injectable()
export class ProductsOptionService extends AbstractService {
  private logger = new Logger('ProductsOptionService');

  constructor(
    @InjectRepository(ProductsOption)
    private readonly productsOptionRepository: Repository<ProductsOption>,
  ) {
    super(productsOptionRepository);
  }

  async getOptionProductById(Id: string) {
    return await this.productsOptionRepository.findOne({ id: Id });
  }
}
