import { Module } from '@nestjs/common';
import { PreferencesShowProductsController } from './preferences-show-products.controller';
import { PreferencesShowProductsService } from './preferences-show-products.service';
import { PreferencesShowProducts } from 'src/db/entities/PreferencesShowProducts';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PreferencesShowProducts]),
    CommonModule,
    AuthModule,
  ],
  controllers: [PreferencesShowProductsController],
  providers: [PreferencesShowProductsService],
  exports: [PreferencesShowProductsService],
})
export class PreferencesShowProductsModule {}
