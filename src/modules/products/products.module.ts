import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/db/entities/Order';
import { Products } from 'src/db/entities/Products';
import { AuthModule } from '../auth/auth.module';
import { CommonModule } from '../common/common.module';
import { ProductOrderService } from '../order/order.service';
import { PreferencesShowProductsModule } from '../preferences-show-products/preferences-show-products.module';
import { CategoryProductModule } from './../category-product/category-product.module';
import { MarketModule } from './../market/market.module';
import { ProductsOptionModule } from './../products-option/products-option.module';
import { ProductRandom, ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { UploadProductController } from './upload.controller';
@Module({
  imports: [
    TypeOrmModule.forFeature([Products, Order]),
    CommonModule,
    AuthModule,
    CategoryProductModule,
    MarketModule,
    ProductsOptionModule,
    PreferencesShowProductsModule,
  ],
  controllers: [ProductsController, ProductRandom, UploadProductController],
  providers: [ProductsService, ProductOrderService],
  exports: [ProductsService],
})
export class ProductsModule {}
