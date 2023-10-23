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
import { generateRandomCode } from '../common/randomCode';
import { ProductsOptionService } from '../products-option/products-option.service';
import { ProductsService } from '../products/products.service';
import { CartService } from './../cart/cart.service';
import { CategoryProductService } from './../category-product/category-product.service';
import { BaseResultError } from './../common/base-result-error.interface';
import { BaseResultData } from './../common/base-result.interface';
import { NotificationsService } from './../notifications/notifications.service';
import { OrderStatusService } from './../order-status/order-status.service';
import { ParcelDeliveryDetailService } from './../parcel-delovery-detail/parcel-delovery-detail.service';
import { ParcelStatusService } from './../parcel-status/parcel-status.service';
import { PaymentTypeService } from './../payment-type/payment-type.service';
import { UserService } from './../user/user.service';
import { CreateProductOrderDto } from './dto/create-product-order.dto';
import { UpdateProductOrderDto } from './dto/update-product-order.dto';
import { ProductOrderService } from './order.service';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard())
@UseGuards(AuthGuard())
@ApiTags('orders')
@Controller('orders')
export class ProductOrderController {
  constructor(
    private readonly productOrderService: ProductOrderService,
    private readonly orderStatusService: OrderStatusService,
    private readonly parcelStatusService: ParcelStatusService,
    private readonly productsService: ProductsService,
    private readonly paymentTypeService: PaymentTypeService,
    private readonly userService: UserService,
    private readonly parcelDeliveryService: ParcelDeliveryDetailService,
    private readonly categoryProductService: CategoryProductService,
    private readonly optionProducttService: ProductsOptionService,
    private readonly cartService: CartService,
    private readonly notificationsService: NotificationsService,
  ) {}

  @Get('getByUserId')
  async getByUserId(@GetUser() user_info: Users, @Query('page') page: number) {
    try {
      return await this.productOrderService.getByUserId(user_info?.id, page, [
        'paymentType',
        'products',
        'orderStatus',
        'parcelStatus',
        'parcelDelivery',
      ]);
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('cancel-create-order')
  async cancelCreateOrder(@GetUser() user_info: Users) {
    try {
      await this.productOrderService.cancelCreateOrder(user_info?.id);

      return new BaseResultData('200', [], '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('check-payment')
  async orderCheckPayment(
    @Query('page') page: number,
    @Query('search') search: string,
    @GetUser() user_info: Users,
  ) {
    try {
      let orders: any = await this.productOrderService.orderCheckPayment(
        search,
        user_info.id,
        page,
      );

      return new BaseResultData('200', orders, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('orders-pending')
  async ordersPending(
    @Query('page') page: number,
    @Query('search') search: string,
    @GetUser() user_info: Users,
  ) {
    try {
      let orders: any = await this.productOrderService.ordersPending(
        search,
        user_info.id,
        page,
      );

      return new BaseResultData('200', orders, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('orders-success')
  async ordersSuccess(
    @Query('page') page: number,
    @Query('search') search: string,
    @Query('search_company') searchCompany: string,
    @GetUser() user_info: Users,
  ) {
    try {
      let orders: any = await this.productOrderService.ordersSuccess(
        search,
        searchCompany,
        user_info.id,
        page,
      );

      return new BaseResultData('200', orders, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('dashbord-repeat-purchase')
  async dashbordRepeatPurchase(
    @Query('filter') filter: string,
    @Query('start_date') startDate: string,
    @Query('end_date') endDate: string,
  ) {
    try {
      const orders: any = await this.productOrderService.dashbordRepeatPurchase(
        filter,
        startDate,
        endDate,
      );

      return new BaseResultData('200', orders, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('dashbord-sales-category')
  async dashbordSalesByCategory(
    @Query('filter') filter: string,
    @Query('start_date') startDate: string,
    @Query('end_date') endDate: string,
  ) {
    try {
      const orders: any =
        await this.productOrderService.dashbordSalesByCategory(
          filter,
          startDate,
          endDate,
        );

      const categorys = await this.categoryProductService.findToDashboard();

      for (const category of categorys) {
        for (const order of orders) {
          if (order.categoryid == category.categoryid) {
            category.totalamount = order.totalamount;
            category.ordersamount = order.ordersamount;
            category.averageSales = order.averageSales;
          } else if (category.totalamount === undefined) {
            category.totalamount = '0';
            category.ordersamount = '0';
            category.averageSales = '0';
          }
        }
      }

      return new BaseResultData('200', categorys, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('dashbord-sales-sverall')
  async dashbordSalesOverall(
    @Query('filter') filter: string,
    @Query('start_date') startDate: string,
    @Query('end_date') endDate: string,
  ) {
    try {
      const ordersCurren: any =
        await this.productOrderService.dashbordSalesOverall(
          filter,
          startDate,
          endDate,
        );

      const ordersOld: any =
        await this.productOrderService.dashbordSalesOverallOld(
          filter,
          startDate,
          endDate,
        );

      let averageTotalAmount;
      let averageOrderAmount;
      let averageSales;

      if (ordersOld.sumTotalAmount === 0) {
        averageTotalAmount = 100; // ให้เปอร์เซ็นต์ความต่างเป็น 100% ในกรณีที่ ordersOld.sumTotalAmount เป็น 0
      } else {
        const differenceTotalAmount =
          ordersCurren.sumTotalAmount - ordersOld.sumTotalAmount;
        averageTotalAmount =
          (differenceTotalAmount / ordersOld.sumTotalAmount) * 100;
      }

      if (ordersOld.sumOrderAmount === 0) {
        averageOrderAmount = 100; // ให้เปอร์เซ็นต์ความต่างเป็น 100% ในกรณีที่ ordersOld.sumTotalAmount เป็น 0
      } else {
        const differenceOrderAmount =
          ordersCurren.sumOrderAmount - ordersOld.sumOrderAmount;

        averageOrderAmount =
          (differenceOrderAmount / ordersOld.sumOrderAmount) * 100;
      }

      if (ordersOld.sumOrderAmount === 0) {
        averageSales = 100; // ให้เปอร์เซ็นต์ความต่างเป็น 100% ในกรณีที่ ordersOld.sumTotalAmount เป็น 0
      } else {
        const differenceAverageSales =
          ordersCurren.averageSales - ordersOld.averageSales;
        averageSales = (differenceAverageSales / ordersOld.averageSales) * 100;
      }

      averageOrderAmount = parseFloat(averageOrderAmount.toFixed(2));
      averageTotalAmount = parseFloat(averageTotalAmount.toFixed(2));
      averageSales = parseFloat(averageSales.toFixed(2));

      return new BaseResultData(
        '200',
        [
          ordersCurren,
          {
            averageTotalAmount: averageTotalAmount,
            averageOrderAmount: averageOrderAmount,
            averageSales: averageSales,
          },
        ],
        '',
        'Success',
      );
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('all-orders')
  async paginateAllOrders(
    @Query('page') page: number,
    @Query('search') search: string,
  ) {
    try {
      let orders: any = await this.productOrderService.paginateOrders(
        search,
        ['paymentType', 'products', 'orderStatus', 'parcelStatus'],
        page,
      );

      return new BaseResultData('200', orders, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async createProductOrder(
    @Body() body: CreateProductOrderDto,
    @GetUser() user_info: Users,
  ) {
    try {
      const { product, payment_type, noti_payment, stepAddress, slipPath } =
        body;
      const user = await this.userService.getUsersWithRelations(user_info.id);
      const orderStatus = await this.orderStatusService.findOne({
        orderStatusCode: 'OS00001',
      });
      const parcelStatus = await this.parcelStatusService.findOne({
        parcelStatusCode: 'PS0001',
      });

      const parcelDelivery = await this.parcelDeliveryService.create({
        createBy: user_info.email,
        updateBy: '',
        createAt: new Date(),
        updateAt: new Date(),
      });
      let key = generateRandomCode('ORDER');

      for (const item of product) {
        let productId: string = item?.product?.id;
        let optionProductId: string = item?.productsOption?.id;
        let code = generateRandomCode('ORDER');
        const productDetail: any = await this.productsService.getroductById(
          productId,
        );
        if (productDetail?.productAmount <= 0) {
          return new BaseResultData(
            '999999',
            [],
            '',
            `ไม่สามารถซื้อสินค้า ${productDetail?.productName} ได้ เนื่องจากสินค้าหมด`,
          );
        }
        const optinProduct: any =
          await this.optionProducttService.getOptionProductById(
            item?.productsOption?.id,
          );
        if (optinProduct?.optionsAmount <= 0) {
          return new BaseResultData(
            '999999',
            [],
            '',
            `ไม่สามารถซื้อสินค้า ${productDetail?.productName} ได้ เนื่องจากสินค้าหมด`,
          );
        }
        let countAmountProduct = productDetail?.productAmount - item?.amount;
        let countAmountProductOption =
          optinProduct?.optionsAmount - item?.amount;
        if (countAmountProduct <= 0) {
          return new BaseResultData(
            '999999',
            [],
            '',
            `ไม่สามารถซื้อสินค้า ${productDetail?.productName} ได้ เนื่องจากสินค้ามีจำนวนไม่พอต่อการสั้งซื้อ`,
          );
        }
        if (countAmountProductOption <= 0) {
          return new BaseResultData(
            '999999',
            [],
            '',
            `ไม่สามารถซื้อสินค้า ${productDetail?.productName} ได้ เนื่องจากสินค้ามีจำนวนไม่พอต่อการสั้งซื้อ`,
          );
        }
        const order = await this.productOrderService.create({
          // ...body,
          orderKey: key,
          orderCode: code,
          orderName: code + ' ' + stepAddress?.users?.firstname,
          address:
            stepAddress?.detailAddress +
            '  ต.' +
            stepAddress?.tambons?.tambon +
            ' อ.' +
            stepAddress?.tambons?.amphoe +
            ' จ.' +
            stepAddress?.tambons?.province,
          totalAmount: productDetail?.productPrice * item?.amount,
          ordersAmount: item?.amount,
          slipPath: slipPath,
          recipient:
            stepAddress?.users?.firstname + ' ' + stepAddress?.users?.lastname,
          phoneNumber: stepAddress?.users?.phoneNumber,
          createAt: new Date(),
          updateAt: new Date(),
          transferDate: slipPath ? new Date() : null,
          createBy: stepAddress?.users?.email,
          updateBy: slipPath ? 'system' : '',
          orderStatus: orderStatus,
          parcelStatus: parcelStatus,
          paymentType: payment_type?.id,
          products: item?.product?.id,
          parcelDelivery: parcelDelivery,
          userid: user_info?.id,
          note: noti_payment?.note,
        });

        await this.productsService.update(productId, {
          productAmount: productDetail?.productAmount - item?.amount,
          updateBy: user_info?.email,
          updateAt: new Date(),
        });

        await this.optionProducttService.update(optionProductId, {
          optionsAmount: optinProduct?.optionsAmount - item?.amount,
          updateBy: user_info?.email,
          updateAt: new Date(),
        });

        await await this.cartService.delete(item?.id);

        const message = `ชื่อออเดอร์(${order?.orderName}) รหัสออเดอร์(${order?.orderCode}) สถานะเป็น: ${orderStatus?.orderStatusName}`;
        const title: string = 'สั่งซื้อสินค้า';

        await this.notificationsService.createNotification(
          user_info.email,
          title,
          message,
          order.id,
          '',
        );
      }
      return new BaseResultData('201', [], '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getProductOrderById(@Param('id') id: string) {
    try {
      const orders = await this.productOrderService.findOne({ id }, [
        'products',
        'paymentType',
        'parcelDelivery',
        'orderStatus',
        'parcelStatus',
      ]);

      return new BaseResultData('200', orders, '', 'Success');
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
    @Body() body: UpdateProductOrderDto,
  ) {
    try {
      await this.productOrderService.update(id, {
        ...body,
        updateAt: new Date(),
        updateBy: user_info.email,
      });
      const orders = await this.productOrderService.findOne({ id });

      return new BaseResultData('200', orders, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      await this.productOrderService.delete(id);
      return new BaseResultData('200', [], '', 'Success deleted successfully');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
