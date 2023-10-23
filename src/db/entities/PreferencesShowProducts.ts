import { BaseEntity, Column, Entity } from 'typeorm';

@Entity('preferences_show_products', { schema: 'public' })
export class PreferencesShowProducts extends BaseEntity {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('boolean', { name: 'is_loggedin' })
  isLoggedIn: boolean;

  @Column('integer', { name: 'format_settings_show', default: 2 })
  formatSettingsShow: number;

  @Column('boolean', { name: 'is_most_sales', default: true })
  isMostSales: boolean;

  @Column('boolean', { name: 'is_lowest_sales', default: false })
  isLowestSales: boolean;

  @Column('boolean', { name: 'active', default: true })
  active: boolean;

  @Column('jsonb', { name: 'product_list', nullable: true })
  productList: object | null;

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
}
