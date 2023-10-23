import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Roles } from './Roles';
import { UsersAddress } from './UsersAddress';
import { AdminMarket } from './AdminMarket';

@Entity('users', { schema: 'public' })
export class Users extends BaseEntity {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('character varying', { name: 'firstname' })
  firstname: string;

  @Column('character varying', { name: 'lastname' })
  lastname: string;

  @Column('character varying', { name: 'phone_number', nullable: true })
  phoneNumber: string | null;

  @Column('character varying', { name: 'email', unique: true })
  email: string;

  @Column('character varying', { name: 'password' })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column('boolean', { name: 'active' })
  active: boolean;

  @Column('character varying', { name: 'create_by', nullable: true })
  createBy: string | null;

  @Column('character varying', { name: 'update_by', nullable: true })
  updateBy: string | null;

  @Column('timestamp with time zone', { name: 'create_at' })
  createAt: Date;

  @Column('timestamp with time zone', { name: 'update_at' })
  updateAt: Date;

  @Column('timestamp with time zone', { name: 'date_of_birth', nullable: true })
  dateOfBirth: Date | null;

  @Column('character varying', { name: 'gender', default: () => "''" })
  gender: string;

  @ManyToOne(() => Roles, (roles) => roles.users)
  @JoinColumn([{ name: 'role_id', referencedColumnName: 'id' }])
  role: Roles;

  @OneToMany(() => UsersAddress, (usersAddress) => usersAddress.users)
  usersAddress: UsersAddress[];

  @OneToMany(() => AdminMarket, (adminMarket) => adminMarket.users)
  adminMarkets: AdminMarket[];
}
