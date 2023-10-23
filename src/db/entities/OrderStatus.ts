import { BaseEntity, Column, Entity, Index, OneToMany } from 'typeorm';
import { Order } from './Order';

@Entity('order_status', { schema: 'public' })
export class OrderStatus extends BaseEntity {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

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

  @Column('character varying', { name: 'description', nullable: true })
  description: string | null;

  @Column('character varying', { name: 'order_status_code', unique: true })
  orderStatusCode: string;

  @Column('character varying', { name: 'order_status_name', unique: true })
  orderStatusName: string;

  @Column('boolean', { name: 'active', default: () => 'true' })
  active: boolean;

  @Column('character varying', { name: 'update_by', nullable: true })
  updateBy: string | null;

  @Column('character varying', { name: 'create_by', nullable: true })
  createBy: string | null;

  @OneToMany(() => Order, (order) => order.orderStatus)
  order: Order[];
}
