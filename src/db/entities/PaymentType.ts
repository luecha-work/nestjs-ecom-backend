import { BaseEntity, Column, Entity, OneToMany } from 'typeorm';
import { Order } from './Order';

@Entity('payment_type', { schema: 'public' })
export class PaymentType extends BaseEntity {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('character varying', { name: 'payment_name', unique: true })
  paymentName: string;

  @Column('character varying', { name: 'payment_code', unique: true })
  paymentCode: string;

  @Column('character varying', { name: 'back_account', nullable: true })
  bankAccount: string;

  @Column('timestamp with time zone', {
    name: 'create_date',
    default: () => 'now()',
  })
  createDate: Date;

  @Column('timestamp with time zone', {
    name: 'update_date',
    default: () => 'now()',
  })
  updateDate: Date;

  @Column('character varying', { name: 'create_by', nullable: true })
  createBy: string | null;

  @Column('character varying', { name: 'update_by', nullable: true })
  updateBy: string | null;

  @Column('boolean', { name: 'active', default: () => 'true' })
  active: boolean;

  @OneToMany(() => Order, (order) => order.paymentType)
  order: Order[];
}
