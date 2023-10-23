import { ParcelStatus } from 'src/db/entities/ParcelStatus';
import { Module } from '@nestjs/common';
import { ParcelStatusController } from './parcel-status.controller';
import { ParcelStatusService } from './parcel-status.service';
import { CommonModule } from '../common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ParcelStatus]), CommonModule],
  controllers: [ParcelStatusController],
  providers: [ParcelStatusService],
  exports: [ParcelStatusService],
})
export class ParcelStatusModule {}
