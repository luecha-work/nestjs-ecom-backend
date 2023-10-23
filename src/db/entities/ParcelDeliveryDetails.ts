import { Column, Entity, OneToMany } from 'typeorm';
import { Order } from './Order';

@Entity('parcel_delivery_details', { schema: 'public' })
export class ParcelDeliveryDetails {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('character varying', {
    name: 'parcel_number',
    nullable: true,
  })
  parcelNumber: string | null;

  @Column('timestamp with time zone', { name: 'delivery_date', nullable: true })
  deliveryDate: Date | null;

  @Column('timestamp with time zone', {
    name: 'receiving_parcel_date',
    nullable: true,
  })
  receivingParcelDate: Date | null;

  @Column('character varying', {
    name: 'transport_company',
    nullable: true,
  })
  transportCompany: string | null;

  @Column('character varying', {
    name: 'description',
    nullable: true,
  })
  description: string | null;

  @Column('character varying', { name: 'create_by', default: () => "''" })
  createBy: string;

  @Column('character varying', { name: 'update_by', default: () => "''" })
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

  @OneToMany(() => Order, (order) => order.parcelDelivery)
  order: Order[];
}
