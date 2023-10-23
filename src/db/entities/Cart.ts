import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Users } from './Users';
import { Market } from './Market';
import { Products } from './Products';
import { ProductsOption } from './ProductOptions';

@Entity('cart', { schema: 'public' })
export class Cart extends BaseEntity {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('integer', { name: 'amount', nullable: false })
  amount: number;

  @Column('boolean', {
    name: 'cf_product',
    nullable: false,
    default: () => 'false',
  })
  cfProduct: boolean;

  @ManyToOne(() => Users, (user) => user.adminMarkets, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  users: Users;

  @ManyToOne(() => Products, (product) => product.cart, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Products;

  @ManyToOne(() => ProductsOption, (productsOption) => productsOption.cart, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'product_option_id', referencedColumnName: 'id' }])
  productsOption: ProductsOption;
}
