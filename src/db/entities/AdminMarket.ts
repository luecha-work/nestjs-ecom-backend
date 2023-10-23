import { BaseEntity, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Users } from './Users';
import { Market } from './Market';

@Entity('admin_market', { schema: 'public' })
export class AdminMarket extends BaseEntity {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @ManyToOne(() => Users, (user) => user.adminMarkets, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  users: Users;

  @ManyToOne(() => Market, (market) => market.adminMarkets, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'market_id', referencedColumnName: 'id' }])
  markets: Market;
}
