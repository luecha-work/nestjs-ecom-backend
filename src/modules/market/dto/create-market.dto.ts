import { IsNotEmpty } from 'class-validator';

export class CreateMarketDto {
  @IsNotEmpty()
  marketName: string;

  @IsNotEmpty()
  marketCode: string;

  discription: string;
}
