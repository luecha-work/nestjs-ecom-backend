import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Users } from 'src/db/entities/Users';
import { GetUser } from 'src/modules/auth/decorator/get-user.decorator';
import { BaseResultError } from '../common/base-result-error.interface';
import { BaseResultData } from '../common/base-result.interface';
import { UserService } from './../user/user.service';
import { AdminMarketService } from './admin-market.service';
import { CreateAdminMarketDto } from './dto/create-admin-market.dto';
import { UpdateAdminMarketDto } from './dto/update-admin-market.dto';
import { MarketService } from './market.service';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard())
@ApiTags('admin-market')
@Controller('admin-market')
export class AdminMarketController {
  constructor(
    private readonly adminMarketService: AdminMarketService,
    private readonly userService: UserService,
    private readonly marketService: MarketService,
  ) {}

  @Get()
  async paginatePage(@Query('page') page: number, @GetUser() user: Users) {
    try {
      const adminMarkets: any = await this.adminMarketService.paginate(page);

      return new BaseResultData('200', adminMarkets, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  //   @HasPermission('roles')
  async findAdminMarketById(@Param('id') id: string) {
    try {
      const market = await this.adminMarketService.findOne({ id });

      return new BaseResultData('200', market, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async create(@Body() body: CreateAdminMarketDto) {
    try {
      const { marketId, userId } = body;

      const market = await this.marketService.findOne({ id: marketId });

      const user = await this.userService.findOne({ id: userId });

      if (!user) throw new BadRequestException('User not found!');
      if (!market) throw new BadRequestException('Market not found!');

      const userChangeRoled = await this.userService.changeUserRole(
        user.id,
        'market',
      );

      const adminMarket = await this.adminMarketService.create({
        users: user,
        markets: market,
      });

      return new BaseResultData('201', adminMarket, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  // @HasPermission('users')
  async updateAdminMarketById(
    @Param('id') id: string,
    @Body() body: UpdateAdminMarketDto,
  ) {
    try {
      const { marketId, userId } = body;

      const market = await this.marketService.findOne({ id: marketId });

      const user = await this.userService.findOne({ id: userId });

      if (!user) throw new BadRequestException('User not found!');

      if (!market) throw new BadRequestException('Market not found!');

      await this.adminMarketService.update(id, {
        users: user,
        markets: market,
      });
      const adminMarket = await this.adminMarketService.findOne({ id });

      return new BaseResultData('200', adminMarket, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  // @HasPermission('users')
  async delete(@Param('id') id: string) {
    try {
      const adminMarket = await this.adminMarketService.findOne({ id }, [
        'users',
      ]);

      const userId = adminMarket?.users?.id;
      const userChangeRoled = await this.userService.changeUserRole(
        userId,
        'user',
      );

      await this.adminMarketService.delete(id);

      return new BaseResultData('200', [], '', 'Success deleted successfully');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
