import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Order } from './Order';
import { CategoryProduct } from './CategoryProduct';
import { Market } from './Market';
import { ProductsOption } from './ProductOptions';
import { Cart } from './Cart';

@Entity('products', { schema: 'public' })
export class Products extends BaseEntity {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('character varying', { name: 'product_code', unique: true })
  productCode: string;

  @Column('character varying', { name: 'product_name', unique: true })
  productName: string;

  @Column('boolean', { name: 'active', default: () => 'true' })
  active: boolean;

  @Column('text', { name: 'product_detail' })
  productDetail: string;

  @Column('integer', { name: 'product_price' })
  productPrice: number;

  @Column('integer', { name: 'product_amount' })
  productAmount: number;

  @Column('integer', { name: 'views', default: 0 })
  views: number;

  @Column('integer', { name: 'product_cost', nullable: true })
  productCost: number;

  @Column('integer', { name: 'product_weight', nullable: true })
  productWeight: number;

  @Column('jsonb', { name: 'path_picture', nullable: true })
  pathPicture: object | null;

  @Column('character varying', {
    name: 'keyword',
    unique: true,
    nullable: false,
  })
  keyword: string;

  @Column('character varying', { name: 'craete_by' })
  craeteBy: string;

  @Column('character varying', { name: 'update_by' })
  updateBy: string;

  @Column('timestamp with time zone', {
    name: 'production_date',
    nullable: true,
  })
  productionDate: Date;

  @Column('timestamp with time zone', {
    name: 'expiration_date',
    nullable: true,
  })
  expirationDate: Date;

  @Column('character varying', {
    name: 'out_stock_notification',
    nullable: true,
  })
  outStockNotification: number;

  @Column('timestamp with time zone', {
    name: 'notify_expiration_date',
    nullable: true,
  })
  notifyExpirationDate: Date;

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

  @OneToMany(() => Order, (Product_order) => Product_order.products)
  productOrder: Order[];

  @ManyToOne(() => CategoryProduct, (category) => category.products)
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category: CategoryProduct;

  @ManyToOne(() => Market, (market) => market.products, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'market_id', referencedColumnName: 'id' }])
  market: Market;

  @OneToMany(
    () => ProductsOption,
    (products_option) => products_option.products,
  )
  productsOption: ProductsOption[];

  @OneToMany(() => Cart, (cart) => cart.product, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  cart: Cart[];
}
