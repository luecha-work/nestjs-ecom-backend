import { CommonModule } from '../common/common.module';
import { CategoryProduct } from 'src/db/entities/CategoryProduct';
import { Module } from '@nestjs/common';
import { CategoryProductController } from './category-product.controller';
import { CategoryProductService } from './category-product.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryProduct]), CommonModule],
  controllers: [CategoryProductController],
  providers: [CategoryProductService],
  exports: [CategoryProductService],
})
export class CategoryProductModule {}
