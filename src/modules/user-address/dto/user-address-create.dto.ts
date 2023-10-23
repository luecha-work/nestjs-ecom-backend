import { IsNotEmpty } from 'class-validator';

export class UserAddressDto {
  @IsNotEmpty()
  detailAddress: string;

  @IsNotEmpty()
  province: string;

  @IsNotEmpty()
  amphoe: string;

  @IsNotEmpty()
  district: string;

  @IsNotEmpty()
  zipCode: string;
}
