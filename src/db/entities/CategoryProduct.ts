import { BaseEntity, Column, Entity, Index, OneToMany } from 'typeorm';
import { Products } from './Products';

@Entity('category_product', { schema: 'public' })
export class CategoryProduct extends BaseEntity {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('character varying', { name: 'category_name', unique: true })
  categoryName: string;

  @Column('character varying', { name: 'category_code', unique: true })
  categoryCode: string;

  @Column('character varying', { name: 'category_detail', nullable: true })
  categoryDetail: string | null;

  // @Column('jsonb', { name: 'path_picture', nullable: true })
  // pathPicture: object | null;

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
  createBy: string | null;

  @Column('character varying', { name: 'update_by', nullable: true })
  updateBy: string | null;

  @Column('boolean', { name: 'active', default: () => 'true' })
  active: boolean;

  @OneToMany(() => Products, (products) => products.category)
  products: Products[];
}
