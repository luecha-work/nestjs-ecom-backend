import { IsNotEmpty } from 'class-validator';

export class CreateOptionsDto {
  @IsNotEmpty()
  optionName: string;

  @IsNotEmpty()
  optionCode: string;

  @IsNotEmpty()
  optionsAmount: number;
}
