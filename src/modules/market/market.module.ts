import { UserModule } from './../user/user.module';
import { Module, forwardRef } from '@nestjs/common';
import { MarketService } from './market.service';
import { MarketController } from './market.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';
import { Market } from 'src/db/entities/Market';
import { AdminMarket } from 'src/db/entities/AdminMarket';
import { AdminMarketService } from './admin-market.service';
import { AdminMarketController } from './admin-market.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Market, AdminMarket]),
    CommonModule,
    forwardRef(() => UserModule),
  ],
  controllers: [MarketController, AdminMarketController],
  providers: [MarketService, AdminMarketService],
  exports: [MarketService, AdminMarketService],
})
export class MarketModule {}
