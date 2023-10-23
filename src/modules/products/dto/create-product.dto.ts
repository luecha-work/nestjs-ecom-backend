import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  productName: string;

  @IsNotEmpty()
  productCode: string;

  @IsNotEmpty()
  productDetail: string;

  @IsNotEmpty()
  keyword: string;

  @IsNotEmpty()
  @IsNumber()
  productPrice: number;

  @IsNotEmpty()
  @IsNumber()
  productAmount: number;

  @IsNotEmpty()
  productCost: number;

  @IsNotEmpty()
  active: boolean;

  // @IsNotEmpty()
  pathPicture: {};

  // @IsNotEmpty()
  productWeight: number;

  // @IsNotEmpty()
  productionDate: Date;

  // @IsNotEmpty()
  expirationDate: Date;

  // @IsNotEmpty()
  outStockNotification: number;

  // @IsNotEmpty()
  notifyExpirationDate: Date | null;

  options: {
    optionName: string;
    optionCode: string;
    optionsAmount: number;
  }[];
}
