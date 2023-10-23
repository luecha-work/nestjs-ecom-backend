import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersAddress } from 'src/db/entities/UsersAddress';
import { Repository } from 'typeorm';
import { AbstractService } from '../common/abstract.service';

@Injectable()
export class UserAddressService extends AbstractService {
  constructor(
    @InjectRepository(UsersAddress)
    private readonly usersAddressRepository: Repository<UsersAddress>,
  ) {
    super(usersAddressRepository);
  }

  async getUsersAddressWithJoin(userId: string): Promise<UsersAddress[]> {
    return await this.usersAddressRepository
      .createQueryBuilder('users_address')
      .leftJoinAndSelect('users_address.tambons', 'tambons')
      .leftJoinAndSelect('users_address.users', 'users')
      .where('users.id = :userId', { userId })
      .orderBy('users_address.createAt', 'ASC')
      .getMany();
  }
}
