import { ParcelDeliveryDetailModule } from './../parcel-delovery-detail/parcel-delovery-detail.module';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { ProductOrderService } from './order.service';
import { ProductOrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';
import { Order } from 'src/db/entities/Order';
import { OrderStatusModule } from '../order-status/order-status.module';
import { ProductsModule } from '../products/products.module';
import { ParcelStatusModule } from '../parcel-status/parcel-status.module';
import { PaymentTypeModule } from '../payment-type/payment-type.module';
import { Products } from 'src/db/entities/Products';
import { CategoryProductModule } from '../category-product/category-product.module';
import { ProductsOptionModule } from '../products-option/products-option.module';
import { CartModule } from '../cart/cart.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Products]),
    CommonModule,
    OrderStatusModule,
    ParcelStatusModule,
    ProductsModule,
    PaymentTypeModule,
    UserModule,
    ParcelDeliveryDetailModule,
    CategoryProductModule,
    ProductsOptionModule,
    CartModule,
    NotificationsModule,
  ],
  controllers: [ProductOrderController],
  providers: [ProductOrderService],
  exports: [ProductOrderService],
})
export class ProductOrderModule {}
