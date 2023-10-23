import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsOption } from 'src/db/entities/ProductOptions';
import { CommonModule } from '../common/common.module';
import { ProductsOptionController } from './products-option.controller';
import { ProductsOptionService } from './products-option.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsOption]), CommonModule],
  controllers: [ProductsOptionController],
  providers: [ProductsOptionService],
  exports: [ProductsOptionService],
})
export class ProductsOptionModule {}
