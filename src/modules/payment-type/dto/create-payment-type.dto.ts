import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentTypeDto {
  @IsString()
  @IsNotEmpty()
  paymentName: string;

  @IsString()
  @IsNotEmpty()
  paymentCode: string;

  @IsNotEmpty()
  active: boolean;

  @IsNotEmpty()
  bankAccount: string;
}
