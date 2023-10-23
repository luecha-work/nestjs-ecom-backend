import { IsNotEmpty } from 'class-validator';

export class UpdateParcelStatusDto {
  parcelStatusName: string;

  parcelStatusCode: string;

  description: string;

  active: boolean;
}
