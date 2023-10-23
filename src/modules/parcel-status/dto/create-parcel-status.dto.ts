import { IsNotEmpty } from 'class-validator';

export class CreateParcelStatusDto {
  @IsNotEmpty()
  parcelStatusName: string;

  @IsNotEmpty()
  parcelStatusCode: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  active: boolean;
}
