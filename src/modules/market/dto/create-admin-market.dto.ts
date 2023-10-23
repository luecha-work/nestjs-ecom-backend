import { IsNotEmpty } from 'class-validator';

export class CreateAdminMarketDto {
  @IsNotEmpty()
  marketId: string;

  @IsNotEmpty()
  userId: string;
}
