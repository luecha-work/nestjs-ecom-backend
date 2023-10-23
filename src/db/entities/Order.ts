import { BaseEntity, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PaymentType } from './PaymentType';
import { Products } from './Products';
import { OrderStatus } from './OrderStatus';
import { ParcelStatus } from './ParcelStatus';
import { ParcelDeliveryDetails } from './ParcelDeliveryDetails';

@Entity('order', { schema: 'public' })
export class Order extends BaseEntity {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('character varying', { name: 'create_by' })
  createBy: string;

  @Column('character varying', { name: 'update_by' })
  updateBy: string;

  @Column('timestamp with time zone', {
    name: 'create_at',
    default: () => 'now()',
  })
  createAt: Date;

  @Column('timestamp with time zone', {
    name: 'update_at',
    default: () => 'now()',
  })
  updateAt: Date;

  @Column('character varying', { name: 'order_code', unique: true })
  orderCode: string;

  @Column('character varying', { name: 'order_key', nullable: true })
  orderKey: string;

  @Column('character varying', { name: 'order_name' })
  orderName: string;

  @Column('character varying', { name: 'address' })
  address: string;

  @Column('character varying', { name: 'phone_number' })
  phoneNumber: string;

  @Column('character varying', { name: 'user_id' })
  userid: string;

  @Column('boolean', { name: 'active', default: () => 'true' })
  active: boolean;

  @Column('text', { name: 'recipient' })
  recipient: string;

  @Column('integer', { name: 'total_amount', default: 0 })
  totalAmount: number;

  @Column('integer', { name: 'orders_amount', nullable: true })
  ordersAmount: number;

  @Column('text', { name: 'slip_path', nullable: true })
  slipPath: string;

  @Column('text', { name: 'note', nullable: true})
  note: string;

  @Column('timestamp with time zone', {
    name: 'transfer_date',
    nullable: true,
    default: null,
  })
  transferDate: Date | null;

  @Column('boolean', { name: 'cash_on_dalivery', nullable: true })
  cashOnDalivery: boolean | null;

  @ManyToOne(() => PaymentType, (paymentType) => paymentType.order)
  @JoinColumn([{ name: 'payment_type_id', referencedColumnName: 'id' }])
  paymentType: PaymentType;

  @ManyToOne(() => Products, (products) => products.productOrder, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'products_id', referencedColumnName: 'id' }])
  products: Products;

  @ManyToOne(() => OrderStatus, (orderStatus) => orderStatus.order)
  @JoinColumn([{ name: 'order_status_id', referencedColumnName: 'id' }])
  orderStatus: OrderStatus;

  @ManyToOne(() => ParcelStatus, (parcelStatus) => parcelStatus.order)
  @JoinColumn([{ name: 'parcel_status_id', referencedColumnName: 'id' }])
  parcelStatus: ParcelStatus;

  @ManyToOne(
    () => ParcelDeliveryDetails,
    (parcelDelivery) => parcelDelivery.order,
  )
  @JoinColumn([{ name: 'parcel_delivery_id', referencedColumnName: 'id' }])
  parcelDelivery: ParcelDeliveryDetails;
}
