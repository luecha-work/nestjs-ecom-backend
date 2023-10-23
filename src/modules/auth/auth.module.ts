import { forwardRef, Module } from '@nestjs/common';
import { JwtStrategy } from 'src/modules/auth/strategy/jwt.strategy';
import { CommonModule } from '../common/common.module';
import { RoleModule } from '../role/role.module';
import { UserModule } from '../user/user.module';
import { MarketModule } from './../market/market.module';
import { TambonsModule } from './../tambons/tambons.module';
import { UserAddressModule } from './../user-address/user-address.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    forwardRef(() => UserModule),
    CommonModule,
    TambonsModule,
    UserAddressModule,
    RoleModule,
    MarketModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
