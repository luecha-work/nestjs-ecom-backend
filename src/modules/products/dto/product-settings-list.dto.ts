export class ProductSettingsListDto {
  productList: ProductSettings[] | null;
}

interface ProductSettings {
  productId: string;
}
