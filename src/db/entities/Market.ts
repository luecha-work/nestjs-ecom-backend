import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Products } from './Products';
import { Users } from './Users';
import { AdminMarket } from './AdminMarket';

@Entity('market', { schema: 'public' })
export class Market extends BaseEntity {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('character varying', { name: 'market_name' })
  marketName: string;

  @Column('character varying', { name: 'market_code' })
  marketCode: string;

  @Column('text', { name: 'discription', nullable: true })
  discription: string | null;

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

  @Column('character varying', { name: 'create_by', nullable: true })
  createBy: string;

  @Column('character varying', { name: 'update_by', nullable: true })
  updateBy: string;

  @Column('boolean', { name: 'active', default: () => 'true' })
  active: boolean;

  @OneToMany(() => Products, (products) => products.market)
  products: Products[];

  @OneToMany(() => AdminMarket, (adminMarket) => adminMarket.markets, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  adminMarkets: AdminMarket[];
}
