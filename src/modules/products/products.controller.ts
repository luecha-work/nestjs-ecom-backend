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
import * as fs from 'fs/promises';
import { Users } from 'src/db/entities/Users';
import { GetUser } from 'src/modules/auth/decorator/get-user.decorator';
import { ProductOrderService } from '../order/order.service';
import { PreferencesShowProductsService } from '../preferences-show-products/preferences-show-products.service';
import { CategoryProductService } from './../category-product/category-product.service';
import { BaseResultError } from './../common/base-result-error.interface';
import { BaseResultData } from './../common/base-result.interface';
import { MarketService } from './../market/market.service';
import { ProductsOptionService } from './../products-option/products-option.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductSettingsListDto } from './dto/product-settings-list.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard())
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoryService: CategoryProductService,
    private readonly marketService: MarketService,
    private readonly productsOptionService: ProductsOptionService,
    private readonly preferencesShowProductsService: PreferencesShowProductsService,
    private readonly productOrderService: ProductOrderService,
  ) {}

  @Get()
  async paginatePage(@Query('page') page: number, @GetUser() user_info: Users) {
    try {
      const products: any = await this.productsService.paginate(page, [
        'category',
      ]);

      return new BaseResultData('200', products, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/find-all')
  async findAllProduct(@GetUser() user_info: Users) {
    try {
      const products: any = await this.productsService.all();

      return new BaseResultData('200', products, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/products-in-user')
  async findProductInCurrenUser(
    @Query('search') search: string,
    @GetUser() user_info: Users,
    @Query('page') page: number = 1,
  ) {
    try {
      const market = await this.marketService.findMarketByCurrenUser(
        user_info.id,
      );
      if (!market) {
        throw new HttpException(
          new BaseResultError('400', 'Market not found', 'Market not found'),
          HttpStatus.BAD_REQUEST,
        );
      }

      const products: any = await this.productsService.findProductInCurrenUser(
        search,
        market.id,
        page,
      );

      return new BaseResultData('200', products, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Get('findProductsByisLogin/:check')
  async findProductsByNotLogin(@Param('check') check: string): Promise<string> {
    try {
      let productDetails;

      const results =
        await this.preferencesShowProductsService.findProductsByLogin(check);
      const formatSettingsShow = results[0]?.format_settings_show;
      const is_most_sales = results[0]?.is_most_sales;

      if (formatSettingsShow === 1) {
        const productList = results[0]?.product_list;
        productDetails = await this.productsService.findProductInListSettings(
          productList,
        );
        if (productDetails.length < 5) {
          const randomProducts = await this.productsService.getRandomProducts(
            5 - productDetails.length,
            productList,
          );
          productDetails.push(...randomProducts);
        }
      } else if (formatSettingsShow === 2) {
        const productList = await this.productOrderService.getMaxOrderProducts(
          is_most_sales,
        );
        productDetails = await this.productsService.findProductInListSettings(
          productList,
        );
        if (productDetails.length < 5) {
          const randomProducts = await this.productsService.getRandomProducts(
            5 - productDetails.length,
            productList,
          );
          productDetails.push(...randomProducts);
        }
      } else {
        productDetails = await this.productsService.getProductByView();
      }
      return productDetails;
    } catch (error) {
      console.error('findProductsByNotLogin->error');
    }
  }

  @Post('/get-in-list-settings')
  async findProductInListSettings(
    @GetUser() user_info: Users,
    @Body() body: ProductSettingsListDto,
  ) {
    try {
      const { productList } = body;

      const products = await this.productsService.findProductInListSettings(
        productList,
      );

      return new BaseResultData('200', products, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async createProduct(
    @GetUser() user_info: Users,
    @Query('category_id') categoryId: string,
    @Body() body: CreateProductDto,
  ) {
    try {
      const category = await this.categoryService.findOne({ id: categoryId });
      const market = await this.marketService.findMarketByCurrenUser(
        user_info.id,
      );
      if (!category) throw new BadRequestException('Category not found!');
      if (!market) throw new BadRequestException('Market not found!');
      const product = await this.productsService.create({
        ...body,
        createAt: new Date(),
        updateAt: new Date(),
        craeteBy: user_info.email,
        updateBy: '',
        category: category,
        market: market,
      });

      const optionsPromises = body.options.map(async (option) => {
        const createdOption = await this.productsOptionService.create({
          optionCode: option.optionCode,
          optionName: option.optionName,
          optionsAmount: option.optionsAmount,
          createAt: new Date(),
          updateAt: new Date(),
          craeteBy: user_info.email,
          updateBy: '',
          products: product,
        });
        return createdOption;
      });

      await Promise.all(optionsPromises);

      return new BaseResultData(
        '201',
        product,
        '',
        'Created product successfully.',
      );
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/getRandomProduct')
  async getRandomProduct(@Query('page') page: number, @GetUser() user: Users) {
    try {
      const getData = await this.productsService.getRandomProduct();

      return new BaseResultData('201', getData.data, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/product-by-category')
  async getProductbyCategoryId(
    @Query('page') page: number,
    @Query('categoryId') categoryId: string,
    @Query('search') search: string,
  ) {
    try {
      const resultData: any = await this.productsService.getProductbySearch(
        search,
        categoryId,
        page,
      );
      return new BaseResultData('200', resultData, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    try {
      const product = await this.productsService.findOne({ id }, [
        'category',
        'productsOption',
      ]);

      return new BaseResultData('200', product, '', 'Success');
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
    @Body() body: UpdateProductDto,
    @GetUser() user_info: Users,
  ) {
    try {
      await this.productsService.update(id, {
        ...body,
        updateBy: user_info.email,
        updateAt: new Date(),
      });

      const resultData = await this.productsService.findOne({ id });

      return new BaseResultData('200', resultData, '', 'Success');
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
      const product = await this.productsService.findOne({ id });

      const productPromises = product.pathPicture.map(async (option) => {
        const fileName = option.url.substring(option.url.lastIndexOf('/') + 1);
        const imagePath = `${process.env.PRODUCTS_PATH}/${fileName}`;

        const deleteImage = await fs.unlink(imagePath);

        return deleteImage;
      });

      await this.productsService.delete(id);
      await Promise.all(productPromises);

      return new BaseResultData('200', [], '', 'Success deleted successfully');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

@UseInterceptors(ClassSerializerInterceptor)
@Controller('random-products')
export class ProductRandom {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/getRandomProduct')
  async getRandomProduct(@Query('page') page: number, @GetUser() user: Users) {
    try {
      const getData = await this.productsService.getRandomProduct();
      return getData;
    } catch (error) {
      throw new HttpException(
        {
          code: '999999',
          error_message: error.response?.message,
          error: error.message,
        },
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
