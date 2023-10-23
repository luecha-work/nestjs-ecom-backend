import { IsNotEmpty } from 'class-validator';

export class CreatePreferencesShow {
  @IsNotEmpty()
  isLoggedIn: boolean;

  @IsNotEmpty()
  formatSettingsShow: number;

  @IsNotEmpty()
  isMostSales: boolean;

  @IsNotEmpty()
  isLowestSales: boolean;

  productList: object | null;

  active: boolean;
}
