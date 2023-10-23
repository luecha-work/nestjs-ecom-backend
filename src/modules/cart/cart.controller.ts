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
import { ProductOrderService } from '../order/order.service';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard())
@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly productOrderService: ProductOrderService,
  ) {}

  @Get()
  async getCartByUserId(
    @GetUser() user: Users,
    @Query('check') check: boolean,
  ) {
    try {
      const cart: any = await this.cartService.findAllByUserId(user?.id, check);

      return new BaseResultData('200', cart, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async createCart(@GetUser() user: Users, @Body() body: CreateCartDto) {
    try {
      let cart;
      const checkId = await this.cartService.findOne({
        where: { product: body?.product, productsOption: body?.productsOption },
      });
      if (checkId?.id) {
        cart = await this.cartService.update(checkId?.id, {
          ...body,
          users: user?.id,
        });
      } else {
        cart = await this.cartService.create({
          ...body,
          users: user?.id,
        });
      }
      return new BaseResultData('201', cart, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @GetUser() user_info: Users,
    @Body() body: UpdateCartDto,
  ) {
    try {
      const cart = await this.cartService.update(id, {
        ...body,
      });

      const updatedCart = await this.cartService.findOne({ id });

      return new BaseResultData('200', updatedCart, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      const cart = await this.cartService.delete(id);

      return new BaseResultData(
        '200',
        cart,
        '',
        'Success deleted successfully',
      );
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
