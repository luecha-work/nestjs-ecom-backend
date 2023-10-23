import { Module, forwardRef } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';
import { Cart } from 'src/db/entities/Cart';
import { Products } from 'src/db/entities/Products';
import { ProductsOptionModule } from '../products-option/products-option.module';
import { Order } from 'src/db/entities/Order';
import { ProductOrderService } from '../order/order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, Order]),
    CommonModule,
    ProductsOptionModule,
    Products,
  ],
  controllers: [CartController],
  providers: [CartService, ProductOrderService],
  exports: [CartService],
})
export class CartModule {}
