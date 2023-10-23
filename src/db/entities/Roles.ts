import { BaseEntity, Column, Entity, OneToMany } from 'typeorm';
import { Users } from './Users';
@Entity('roles', { schema: 'public' })
export class Roles extends BaseEntity {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('integer', { name: 'role_code', unique: true })
  roleCode: number;

  @Column('character varying', { name: 'role_name', unique: true })
  roleName: string;

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

  @OneToMany(() => Users, (users) => users.role)
  users: Users[];
}
