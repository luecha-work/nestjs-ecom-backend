import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { CommonModule } from '../common/common.module';
import { RoleModule } from '../role/role.module';
import { Users } from 'src/db/entities/Users';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    CommonModule,
    AuthModule,
    RoleModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
