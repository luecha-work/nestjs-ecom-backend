import { CommonModule } from './../common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParcelDeliveryDetails } from 'src/db/entities/ParcelDeliveryDetails';
import { Module } from '@nestjs/common';
import { ParcelDeliveryDetailController } from './parcel-delovery-detail.controller';
import { ParcelDeliveryDetailService } from './parcel-delovery-detail.service';

@Module({
  imports: [TypeOrmModule.forFeature([ParcelDeliveryDetails]), CommonModule],
  controllers: [ParcelDeliveryDetailController],
  providers: [ParcelDeliveryDetailService],
  exports: [ParcelDeliveryDetailService],
})
export class ParcelDeliveryDetailModule {}
