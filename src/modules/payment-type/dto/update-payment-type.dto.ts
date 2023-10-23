import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePaymentTypeDto {
  paymentName: string;

  paymentCode: string;

  active: boolean;
}
