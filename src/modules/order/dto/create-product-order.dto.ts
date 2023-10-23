import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductOrderDto {
  [x: string]: any;
  // @IsNotEmpty()
  // orderName: string;

  // @IsNotEmpty()
  // orderCode: string;

  // @IsNotEmpty()
  // discription: string;

  // @IsNotEmpty()
  // cashOnDalivery: boolean;

  // @IsNotEmpty()
  // @IsNumber()
  // ordersAmount: number;

  // // transferDate: Date | null;

  // slipPath: string | null;

  // @IsNotEmpty()
  // active: boolean;
  @IsNotEmpty()
  product?: any;

  @IsNotEmpty()
  noti_payment?: any;

  @IsNotEmpty()
  stepAddress: any;

  @IsNotEmpty()
  payment_type?: any;

  slipPath:string
}
