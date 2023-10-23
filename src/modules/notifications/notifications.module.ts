import { AuthModule } from '../auth/auth.module';
import { CommonModule } from '../common/common.module';
import { Notifications } from 'src/db/entities/Notifications';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { UserModule } from '../user/user.module';
import { MarketModule } from '../market/market.module';
import { ProductOrderModule } from '../order/order.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notifications]),
    forwardRef(() => ProductOrderModule),
    CommonModule,
    AuthModule,
    UserModule,
    MarketModule,
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
