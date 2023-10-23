import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Products } from './Products';
import { Cart } from './Cart';

@Entity('products_option', { schema: 'public' })
export class ProductsOption extends BaseEntity {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('character varying', { name: 'option_code', unique: true })
  optionCode: string;

  @Column('character varying', { name: 'option_name' })
  optionName: string;

  @Column('integer', { name: 'options_amount' })
  optionsAmount: number;

  @Column('character varying', { name: 'craete_by' })
  craeteBy: string;

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

  @ManyToOne(() => Products, (products) => products.productsOption, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'products_id', referencedColumnName: 'id' }])
  products: Products;

  @OneToMany(() => Cart, (cart) => cart.productsOption)
  cart: Cart[];
}
