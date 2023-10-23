import { BaseEntity, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Tambons } from './Tambons';
import { Users } from './Users';

@Entity('users_address', { schema: 'public' })
export class UsersAddress extends BaseEntity {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('text', { name: 'detail_address', default: () => "''" })
  detailAddress: string;

  @Column('timestamp with time zone', {
    name: 'create_at',
    nullable: true,
    default: () => 'now()',
  })
  createAt: Date | null;

  @Column('timestamp with time zone', {
    name: 'update_at',
    nullable: true,
    default: () => 'now()',
  })
  updateAt: Date | null;

  @ManyToOne(() => Tambons, (tambons) => tambons.usersAddresses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'tambonsId', referencedColumnName: 'id' }])
  tambons: Tambons;

  @ManyToOne(() => Users, (users) => users.usersAddress, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'usersId', referencedColumnName: 'id' }])
  users: Users;
}
