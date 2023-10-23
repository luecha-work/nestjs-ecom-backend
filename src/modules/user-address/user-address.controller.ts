import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Users } from 'src/db/entities/Users';
import { GetUser } from 'src/modules/auth/decorator/get-user.decorator';
import { BaseResultError } from '../common/base-result-error.interface';
import { BaseResultData } from '../common/base-result.interface';
import { TambonsService } from '../tambons/tambons.service';
import { UserAddressDto } from './dto/user-address-create.dto';
import { UserAddressService } from './user-address.service';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard())
@ApiTags('user-address')
@Controller('user-address')
export class UserAddressController {
  constructor(
    private userAddressService: UserAddressService,
    private tambonsService: TambonsService,
  ) {}

  @Get(':id')
  async paginatePage(@Param('id') id: string) {
    try {
      const users_address: any =
        await this.userAddressService.getUsersAddressWithJoin(id);

      return new BaseResultData('200', users_address, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async createUserAddress(
    @GetUser() user_info: Users,
    @Body() body: UserAddressDto,
  ) {
    try {
      const tombans = await this.tambonsService.getTambonDetail(
        body?.district,
        body?.amphoe,
        body?.province,
        body?.zipCode,
      );
      const create = await this.userAddressService.create({
        users: user_info,
        detailAddress: body?.detailAddress,
        tambons: tombans?.id,
        createAt: new Date(),
        updateAt: new Date(),
      });
      return new BaseResultData('201', create, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
