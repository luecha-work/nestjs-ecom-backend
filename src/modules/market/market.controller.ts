import {
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
import { CreateMarketDto } from './dto/create-market.dto';
import { UpdateMarketDto } from './dto/update-market.dto';
import { MarketService } from './market.service';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard())
@ApiTags('market')
@Controller('market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Get()
  async paginatePage(@Query('page') page: number, @GetUser() user: Users) {
    try {
      const markets: any = await this.marketService.paginate(page);

      return new BaseResultData('200', markets, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('user-in-market')
  async findUsersInMarket(@Query('page') page: number, @GetUser() user: Users) {
    try {
      const markets: any = await this.marketService.findMarketByCurrenUser(
        user.id,
      );

      const usersMarget: any = await this.marketService.findUsersInMarket(
        markets.id,
      );

      const usersList: any = await this.marketService.findUsersListInMarket(
        markets.id,
      );

      return new BaseResultData('200', [usersMarget, usersList], '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async createPaymentType(
    @Body() body: CreateMarketDto,
    @GetUser() user_info: Users,
  ) {
    try {
      const market = await this.marketService.create({
        ...body,
        createBy: user_info.email,
        updateBy: '',
        createAt: new Date(),
        updateAt: new Date(),
      });

      return new BaseResultData('201', market, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  //   @HasPermission('roles')
  async getProductOrderById(@Param('id') id: string) {
    try {
      const market = await this.marketService.findOne({ id });

      return new BaseResultData('200', market, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async updateProductById(
    @Param('id') id: string,
    @GetUser() user_info: Users,
    @Body() body: UpdateMarketDto,
  ) {
    try {
      await this.marketService.update(id, {
        ...body,
        updateBy: user_info.email,
        updateAt: new Date(),
      });

      const market = await this.marketService.findOne({ id });

      return new BaseResultData('201', market, '', 'Success');
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
      await this.marketService.delete(id);

      return new BaseResultData('200', [], '', 'Success deleted successfully');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
