import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/modules/auth/strategy/jwt.strategy';
import { UserModule } from './../user/user.module';
import { UploadController } from './upload.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: 259200,
        },
      }),
    }),
    forwardRef(() => UserModule),
  ],
  exports: [JwtModule, PassportModule, ConfigModule],
  controllers: [UploadController],
  providers: [JwtStrategy],
})
export class CommonModule {}
