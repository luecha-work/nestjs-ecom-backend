import { IsNotEmpty } from 'class-validator';

export class CreateOrderStatusDto {
  @IsNotEmpty()
  orderStatusName: string;

  @IsNotEmpty()
  orderStatusCode: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  active: boolean;
}
