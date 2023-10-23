export class UpdateProductDto {
  productName: string;

  productCode: string;

  productDetail: string;

  keyword: string;

  productPrice: number;

  productAmount: number;

  productCost: number;

  active: boolean;

  pathPicture: {};

  productWeight: number;

  productionDate: Date;

  expirationDate: Date;

  outStockNotification: number;

  notifyExpirationDate: Date | null;

  views: number ;
}
