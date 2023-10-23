import { BaseEntity, Column, Entity } from 'typeorm';

@Entity('notifications', { schema: 'public' })
export class Notifications extends BaseEntity {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('character varying', { name: 'title' })
  title: string;

  @Column('character varying', { name: 'message' })
  message: string;

  @Column('character varying', { name: 'market_id', nullable: true })
  marketId: string;

  @Column('character varying', { name: 'order_id', nullable: true })
  orderId: string;

  @Column('boolean', {
    name: 'isviewed',
    default: () => 'false',
  })
  isviewed: boolean;

  @Column('character varying', { name: 'create_by' })
  createBy: string;

  @Column('character varying', { name: 'update_by' })
  updateBy: string;

  @Column('timestamp with time zone', { name: 'create_at' })
  createAt: Date;

  @Column('timestamp with time zone', { name: 'update_at' })
  updateAt: Date;
}
