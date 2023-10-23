import { IsNotEmpty } from 'class-validator';

export class CreateParcelDeliveryDto {
  @IsNotEmpty()
  deliveryDate: Date;

  @IsNotEmpty()
  receivingParcelDate: Date;

  @IsNotEmpty()
  transportCompany: string;

  @IsNotEmpty()
  description: string | null;
}
