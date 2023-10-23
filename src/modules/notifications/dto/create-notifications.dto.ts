import { IsNotEmpty } from 'class-validator';

export class CreateNotificationsDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
  orderId: string;
}
