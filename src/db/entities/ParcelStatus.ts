import { BaseEntity, Column, Entity, Index, OneToMany } from 'typeorm';
import { Order } from './Order';

@Entity('parcel_status', { schema: 'public' })
export class ParcelStatus extends BaseEntity {
  @Column('character varying', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('character varying', { name: 'parcel_status_name', unique: true })
  parcelStatusName: string;

  @Column('character varying', { name: 'parcel_status_code', unique: true })
  parcelStatusCode: string;

  @Column('character varying', { name: 'description', nullable: true })
  description: string | null;

  @Column('boolean', { name: 'active', default: () => 'true' })
  active: boolean;

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

  @Column('timestamp with time zone', {
    name: '',
    default: () => 'now()',
  })
  @Column('character varying', { name: 'create_by', nullable: true })
  createBy: string | null;

  @Column('character varying', { name: 'update_by', nullable: true })
  updateBy: string | null;

  @OneToMany(() => Order, (order) => order.orderStatus)
  order: Order[];
}
