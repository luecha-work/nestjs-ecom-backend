import { CommonModule } from './../common/common.module';
import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from 'src/db/entities/Roles';

@Module({
  imports: [TypeOrmModule.forFeature([Roles]), CommonModule],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
