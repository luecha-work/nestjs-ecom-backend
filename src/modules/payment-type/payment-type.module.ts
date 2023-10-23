import { Module } from '@nestjs/common';
import { PaymentTypeService } from './payment-type.service';
import { PaymentTypeController } from './payment-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CommonModule } from '../common/common.module';
import { PaymentType } from 'src/db/entities/PaymentType';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentType]), CommonModule, AuthModule],
  controllers: [PaymentTypeController],
  providers: [PaymentTypeService],
  exports: [PaymentTypeService],
})
export class PaymentTypeModule {}
