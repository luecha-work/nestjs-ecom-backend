import { Module } from '@nestjs/common';
import { TambonsService } from './tambons.service';
import { TambonsController } from './tambons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tambons } from 'src/db/entities/Tambons';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tambons]), CommonModule],
  providers: [TambonsService],
  controllers: [TambonsController],
  exports: [TambonsService],
})
export class TambonsModule {}
