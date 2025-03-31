import { configValidationSchema } from './config.schema';
import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './modules/common/common.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RoleModule } from './modules/role/role.module';
import { ProductsModule } from './modules/products/products.module';
import { ProductOrderModule } from './modules/order/order.module';
import { PaymentTypeModule } from './modules/payment-type/payment-type.module';
import { MarketModule } from './modules/market/market.module';
import { TambonsModule } from './modules/tambons/tambons.module';
import { UserAddressModule } from './modules/user-address/user-address.module';
import { CategoryProductModule } from './modules/category-product/category-product.module';
import { OrderStatusModule } from './modules/order-status/order-status.module';
import { ParcelStatusModule } from './modules/parcel-status/parcel-status.module';
import { ParcelDeliveryDetailModule } from './modules/parcel-delovery-detail/parcel-delovery-detail.module';
import { ProductsOptionModule } from './modules/products-option/products-option.module';
import { CartModule } from './modules/cart/cart.module';
import { PreferencesShowProductsModule } from './modules/preferences-show-products/preferences-show-products.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { Scheduler } from './scheduler';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      envFilePath: [`.env`],
      validationSchema: configValidationSchema,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: 'postgresql://neondb_owner:npg_jLhUE21Mqbnu@ep-crimson-glitter-a55dohj9.us-east-2.aws.neon.tech/neondb?sslmode=require',
        // host: configService.get('DB_HOST'),
        // port: configService.get('DB_PORT'),
        // username: configService.get('DB_USERNAME'),
        // password: configService.get('DB_PASSWORD'),
        // database: configService.get('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
        // logging: true, //show query
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false
          }
        }
      }),
    }),
    AuthModule,
    CommonModule,
    RoleModule,
    ProductsModule,
    ProductOrderModule,
    PaymentTypeModule,
    MarketModule,
    TambonsModule,
    UserAddressModule,
    CategoryProductModule,
    OrderStatusModule,
    ParcelStatusModule,
    ParcelDeliveryDetailModule,
    ProductsOptionModule,
    CartModule,
    PreferencesShowProductsModule,
    NotificationsModule,
  ],
  providers: [Scheduler],
})
export class AppModule { }
