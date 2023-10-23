import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersAddress } from 'src/db/entities/UsersAddress';
import { CommonModule } from '../common/common.module';
import { TambonsModule } from '../tambons/tambons.module';
import { UserAddressController } from './user-address.controller';
import { UserAddressService } from './user-address.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersAddress]),
    CommonModule,
    TambonsModule,
  ],
  controllers: [UserAddressController],
  providers: [UserAddressService],
  exports: [UserAddressService],
})
export class UserAddressModule {}
