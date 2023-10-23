import { ParcelDeliveryDetails } from 'src/db/entities/ParcelDeliveryDetails';
import { Products } from 'src/db/entities/Products';
import { PaymentType } from 'src/db/entities/PaymentType';
import { ParcelStatus } from 'src/db/entities/ParcelStatus';
import { OrderStatus } from 'src/db/entities/OrderStatus';
export class UpdateProductOrderDto {
  orderName: string;

  orderCode: string;

  discription: string;

  active: boolean;

  cashOnDalivery: boolean;

  orderStatus: OrderStatus;

  parcelStatus: ParcelStatus;

  paymentType: PaymentType;

  products: Products;

  parcelDelivery: ParcelDeliveryDetails;
}
