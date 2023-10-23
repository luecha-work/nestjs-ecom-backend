import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersAddress } from './UsersAddress';

@Entity('tambons', { schema: 'public' })
export class Tambons extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'tambon', length: 100 })
  tambon: string;

  @Column('character varying', { name: 'amphoe', length: 100 })
  amphoe: string;

  @Column('character varying', { name: 'province', length: 100 })
  province: string;

  @Column('character varying', { name: 'zipcode', length: 100 })
  zipcode: string;

  @Column('character varying', { name: 'tambon_code', length: 100 })
  tambonCode: string;

  @Column('character varying', { name: 'amphoe_code', length: 100 })
  amphoeCode: string;

  @Column('character varying', { name: 'province_code', length: 100 })
  provinceCode: string;

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

  @OneToMany(() => UsersAddress, (usersAddress) => usersAddress.tambons)
  usersAddresses: UsersAddress[];
}
