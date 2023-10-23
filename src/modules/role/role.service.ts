import { Roles } from 'src/db/entities/Roles';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractService } from '../common/abstract.service';

@Injectable()
export class RoleService extends AbstractService {
  private logger = new Logger('RoleService');

  constructor(
    @InjectRepository(Roles) private readonly roleRepository: Repository<Roles>,
  ) {
    super(roleRepository);
  }

  async getRoleNoNAdmin(): Promise<Roles[]> {
    const role = await this.roleRepository
      .createQueryBuilder('roles')
      .select('roles.roleName', 'label')
      .addSelect('roles.roleCode', 'value')
      .addSelect('roles.id', 'id')
      .where('roles.roleName <> :r', { r: 'admin_manager' })
      .getRawMany<Roles>();

    return role;
  }

  async countRole(): Promise<number> {
    try {
      let role_number = await this.roleRepository.count();

      return role_number;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findRoleAdminDetail(): Promise<Roles> {
    try {
      return await this.roleRepository.findOne({
        where: { roleName: 'admin_manager' },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findRoleAdminMarket(): Promise<Roles> {
    try {
      return await this.roleRepository.findOne({
        where: { roleCode: '2' },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findRoleUser(): Promise<Roles> {
    try {
      return await this.roleRepository.findOne({
        where: { roleCode: '3' },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findRoleByName(roleName: string): Promise<Roles> {
    try {
      return await this.roleRepository.findOne({
        where: { roleName: roleName },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  private async onModuleInit() {
    try {
      this.logger.warn(`starting check data in role entity to create role`);
      const initialDataExists = await this.checkInitialData();
      if (!initialDataExists) {
        await this.createInitialData();
      }
    } catch (error) {}
  }

  private async checkInitialData(): Promise<boolean> {
    try {
      const count = await this.roleRepository.count();
      return count > 0;
    } catch (error) {}
  }

  private async createInitialData(): Promise<void> {
    try {
      const firstRecordRole = {
        roleName: 'admin_manager',
        roleCode: 1,
        createBy: 'system',
        active: true,
        createAt: new Date(),
        updateAt: new Date(),
        // permissions: ids.map((id) => ({ id })),
      };
      const secondRecordRole = {
        roleName: 'admin_market',
        roleCode: 2,
        createBy: 'system',
        active: true,
        createAt: new Date(),
        updateAt: new Date(),
        // permissions: ids.map((id) => ({ id })),
      };

      const endRecordRole = {
        roleName: 'user',
        roleCode: 3,
        createBy: 'system',
        active: true,
        createAt: new Date(),
        updateAt: new Date(),
        // permissions: ids.map((id) => ({ id })),
      };

      await super.create(firstRecordRole);
      await super.create(secondRecordRole);
      await super.create(endRecordRole);

      const role = await this.roleRepository.find();

      this.logger.warn(
        `Create ${
          role.length
        } role in first starting project e-commerce-backend ${JSON.stringify(
          role,
        )}`,
      );
    } catch (error) {}
  }
}
