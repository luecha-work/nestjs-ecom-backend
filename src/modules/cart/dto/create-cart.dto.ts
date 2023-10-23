import { IsNotEmpty } from 'class-validator';

export class CreateCartDto {
    @IsNotEmpty()
    amount: number;

    @IsNotEmpty()
    product: string;
  
    @IsNotEmpty()
    productsOption: string;
  }