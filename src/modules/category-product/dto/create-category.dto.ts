import { IsNotEmpty } from 'class-validator';

export class CreateCategoryOrderDto {
  @IsNotEmpty()
  categoryName: string;

  @IsNotEmpty()
  categoryCode: string;

  @IsNotEmpty()
  categoryDetail: string;
}
