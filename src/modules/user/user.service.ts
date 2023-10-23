import { RoleService } from './../role/role.service';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { AbstractService } from '../common/abstract.service';
import { PaginatedResult } from '../common/paginated-result.interface';
import * as bcrypt from 'bcryptjs';
import { Users } from 'src/db/entities/Users';

@Injectable()
export class UserService extends AbstractService {
  private logger = new Logger('UserService');

  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    private readonly roleService: RoleService,
  ) {
    super(userRepository);
  }

  async onModuleInit() {
    try {
      this.logger.warn(
        `starting check data in users entity to create first user adminitor`,
      );

      // ตรวจสอบว่ามีข้อมูลเริ่มต้นอยู่หรือไม่ และถ้าไม่มีให้สร้างและบันทึกข้อมูลเริ่มต้น
      const initialDataExists = await this.checkInitialData();
      if (!initialDataExists) {
        await this.createInitialData();
      }
    } catch (error) {
      console.log(
        `Error creating initial data -> onModuleInit: ${error.message}`,
      );
    }
  }

  private async checkInitialData(): Promise<boolean> {
    try {
      const count = await this.userRepository.count();
      return count > 0;
    } catch (error) {
      console.log(
        `Error creating initial data -> checkInitialData: ${error.message}`,
      );
    }
  }

  private async createInitialData(): Promise<void> {
    try {
      const hashed = await bcrypt.hash('Admin_12345', 12);

      const role = await this.roleService.findRoleAdminDetail();

      const user = await super.create({
        firstname: 'admin',
        lastname: 'managment',
        username: 'administer',
        email: 'admin@example.com',
        password: hashed,
        active: true,
        createBy: 'system',
        createAt: new Date(),
        updateAt: new Date(),
        role: { id: role.id },
      });

      this.logger.warn(
        `Create user ${
          user.lastname + ' ' + user.firstname
        } in first starting project e-commerce-backend ${JSON.stringify(user)}`,
      );
    } catch (error) {
      console.log(
        `Error creating initial data -> createInitialData: ${error.message}`,
      );
    }
  }

  async paginate(page = 1, relations = []): Promise<PaginatedResult> {
    const { data, meta } = await super.paginate(page, relations);

    return {
      data: data.map((user) => {
        const { password, ...data } = user;
        return data;
      }),
      meta,
    };
  }

  async getUsersWithRelations(userId: string): Promise<Users[]> {
    try {
      const user = await this.userRepository
        .createQueryBuilder('users')
        .leftJoinAndSelect('users.usersAddress', 'usersAddress')
        .leftJoinAndSelect('usersAddress.tambons', 'tambons')
        .where('users.id = :userId', { userId })
        .getMany();

      return user;
    } catch (error) {
      this.logger.error(
        `Error UserService => getUsersWithRelations ${error.message}`,
      );
    }
  }

  async findUsersToAdminMarket(usersList: string[]): Promise<Users[]> {
    let role_code = '1';

    try {
      const users = await this.userRepository
        .createQueryBuilder('users')
        .leftJoin('users.role', 'role')
        .where('users.id NOT IN (:...users_list)', { users_list: usersList }) // Remove parentheses here
        .andWhere('role.roleCode <> :role_code', { role_code })
        .orderBy('users.email', 'ASC')
        .getMany();

      return users;
    } catch (error) {
      this.logger.error(
        `Error UserService => findUsersToAdminMarket ${error.message}`,
      );
    }
  }

  async findRoleCodeByUserInfo(userId: string) {
    try {
      const users = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['role'],
      });

      return users?.role.roleCode;
    } catch (error) {
      this.logger.error(
        `Error UserService => findRoleCodeByUserInfo ${error.message}`,
      );
    }
  }

  async changeUserRole(userId: string, toRole: string) {
    try {
      if (toRole === 'market') {
        const role = await this.roleService.findRoleAdminMarket();
        await this.userRepository.update(userId, { role });
      } else if (toRole === 'user') {
        const role = await this.roleService.findRoleUser();
        await this.userRepository.update(userId, { role });
      }

      return await this.userRepository.findOne(userId);
    } catch (error) {
      this.logger.error(
        `Error UserService => findUsersToAdminMarket ${error.message}`,
      );
    }
  }
}
