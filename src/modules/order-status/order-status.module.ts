import { OrderStatus } from 'src/db/entities/OrderStatus';
import { CommonModule } from './../common/common.module';
import { Module } from '@nestjs/common';
import { OrderStatusController } from './order-status.controller';
import { OrderStatusService } from './order-status.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OrderStatus]), CommonModule],
  controllers: [OrderStatusController],
  providers: [OrderStatusService],
  exports: [OrderStatusService],
})
export class OrderStatusModule {}
