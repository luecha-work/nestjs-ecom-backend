import { InjectRepository } from '@nestjs/typeorm';
import { ParcelStatus } from 'src/db/entities/ParcelStatus';
import { AbstractService } from '../common/abstract.service';
import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class ParcelStatusService extends AbstractService {
  private logger = new Logger('ParcelStatusService');

  constructor(
    @InjectRepository(ParcelStatus)
    private readonly parcelStatusRepository: Repository<ParcelStatus>,
  ) {
    super(parcelStatusRepository);
  }

  async findParcelStatus() {
    return await this.parcelStatusRepository
      .createQueryBuilder('parcel_status')
      .orderBy('parcel_status.parcelStatusCode', 'ASC')
      .getMany();
  }

  async findParcelStatusOnOrderSuccess() {
    return await this.parcelStatusRepository
      .createQueryBuilder('parcel_status')
      .where('parcel_status.parcelStatusName <> :ps', {
        ps: 'รอจัดส่ง',
      })
      .orderBy('parcel_status.parcelStatusName', 'ASC')
      .getMany();
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
      const count = await this.parcelStatusRepository.count();
      return count > 0;
    } catch (error) {}
  }

  private async createInitialData(): Promise<void> {
    try {
      const parcelStatus1 = {
        parcelStatusName: 'รอจัดส่ง',
        parcelStatusCode: 'PS0001',
        description: '',
        createBy: 'system',
        updateBy: '',
        active: true,
        createAt: new Date(),
        updateAt: new Date(),
      };

      const parcelStatus2 = {
        parcelStatusName: 'จัดส่ง',
        parcelStatusCode: 'PS0002',
        description: '',
        createBy: 'system',
        updateBy: '',
        active: true,
        createAt: new Date(),
        updateAt: new Date(),
      };

      const parcelStatus3 = {
        parcelStatusName: 'จัดส่งสำเร็จ',
        parcelStatusCode: 'PS0003',
        description: '',
        createBy: 'system',
        updateBy: '',
        active: true,
        createAt: new Date(),
        updateAt: new Date(),
      };

      const parcelStatus4 = {
        parcelStatusName: 'จัดส่งไม่สำเร็จ',
        parcelStatusCode: 'PS0004',
        description: '',
        createBy: 'system',
        updateBy: '',
        active: true,
        createAt: new Date(),
        updateAt: new Date(),
      };

      await super.create(parcelStatus1);
      await super.create(parcelStatus2);
      await super.create(parcelStatus3);
      await super.create(parcelStatus4);

      const parcelStatus = await this.parcelStatusRepository.find();

      this.logger.warn(
        `Create ${
          parcelStatus.length
        } parcel Status in first starting project e-commerce-backend ${JSON.stringify(
          parcelStatus,
        )}`,
      );
    } catch (error) {}
  }
}
