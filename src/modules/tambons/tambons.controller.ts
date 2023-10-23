import { Controller, Get, NotFoundException, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseResultData } from '../common/base-result.interface';
import { TambonsService } from './tambons.service';

// @UseGuards(AuthGuard())
@ApiTags('tambons')
@Controller('tambons')
export class TambonsController {
  constructor(private tambonsService: TambonsService) {}

  @Get('providers')
  async getProvince(@Req() request: Request): Promise<BaseResultData> {
    try {
      const province = await this.tambonsService.getProvince();

      const result = new BaseResultData('200', province, '', 'Success');

      return result;
    } catch (error) {
      throw new NotFoundException('Get providers error: ' + error.message);
    }
  }

  @Get('amphoes')
  async getAmphoes(@Query() query): Promise<BaseResultData> {
    try {
      const { provinceCode } = query;

      const amphoe = await this.tambonsService.getAmphoes(provinceCode);

      const result = new BaseResultData('200', amphoe, '', 'Success');

      return result;
    } catch (error) {
      throw new NotFoundException('Get amphoe error: ' + error.message);
    }
  }

  @Get('districts')
  async getDistricts(@Query() query): Promise<BaseResultData> {
    try {
      const { provinceCode, amphoeCode } = query;

      const district = await this.tambonsService.getDistricts(
        provinceCode,
        amphoeCode,
      );

      const result = new BaseResultData('200', district, '', 'Success');

      return result;
    } catch (error) {
      throw new NotFoundException('Get district error: ' + error.message);
    }
  }
  @Get('zipcode')
  async getZipCode(@Query() query): Promise<BaseResultData> {
    try {
      const { provinceCode, districtCode, amphoeCode } = query;

      const zipCode = await this.tambonsService.getZipCode(
        districtCode,
        amphoeCode,
        provinceCode,
      );

      const result = new BaseResultData('200', zipCode, '', 'Success');

      return result;
    } catch (error) {
      throw new NotFoundException('Get district error: ' + error.message);
    }
  }
}
