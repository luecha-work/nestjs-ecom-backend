import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from '../common/abstract.service';
import { Tambons } from 'src/db/entities/Tambons';
import { Repository } from 'typeorm';
import {
  TambonsResultModel,
  ZipCodeResultModel,
} from './models/tambons.interface';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class TambonsService extends AbstractService {
  private logger = new Logger('TambonsService');
  constructor(
    @InjectRepository(Tambons)
    private readonly tambonsRepository: Repository<Tambons>,
  ) {
    super(tambonsRepository);
  }

  async onModuleInit() {
    try {
      this.logger.warn(
        `starting check data in tambons entity to create tambons data`,
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
      const count = await this.tambonsRepository.count();
      return count > 0;
    } catch (error) {
      console.log(
        `Error creating initial data -> checkInitialData: ${error.message}`,
      );
    }
  }

  private async createInitialData(): Promise<void> {
    const rootPath = process.cwd();
    const filePath = path.join(rootPath, 'tambons.json');
    try {
      const rawData = fs.readFileSync(filePath, 'utf8');
      const jsonData = JSON.parse(rawData);

      const tambonsToInsert = jsonData.map((data) =>
        this.tambonsRepository.create(data),
      );

      await this.tambonsRepository.save(tambonsToInsert);

      this.logger.warn(
        `Create tambons in first starting project e-commerce-backend`,
      );
    } catch (error) {
      console.log(
        `Error creating initial data -> createInitialData: ${error.message}`,
      );
    }
  }

  async getProvince(): Promise<TambonsResultModel[]> {
    const result = await this.tambonsRepository
      .createQueryBuilder('Tambons')
      .select('Tambons.province', 'label')
      .addSelect('Tambons.provinceCode', 'value')
      .groupBy('Tambons.province')
      .addGroupBy('Tambons.provinceCode')
      .getRawMany<TambonsResultModel>();

    return result;
  }

  async getAmphoes(provinceCode: string): Promise<TambonsResultModel[]> {
    const result = await this.tambonsRepository
      .createQueryBuilder('Tambons')
      .select('Tambons.amphoe', 'label')
      .addSelect('Tambons.amphoeCode', 'value')
      .groupBy('Tambons.amphoe')
      .addGroupBy('Tambons.amphoeCode')
      .where('Tambons.provinceCode = :provCode', { provCode: provinceCode })
      .getRawMany<TambonsResultModel>();

    return result;
  }

  async getDistricts(
    provinceCode: string,
    amphoeCode: string,
  ): Promise<TambonsResultModel[]> {
    const result = await this.tambonsRepository
      .createQueryBuilder('Tambons')
      .select('Tambons.tambon', 'label')
      .addSelect('Tambons.tambonCode', 'value')
      .groupBy('Tambons.tambon')
      .addGroupBy('Tambons.tambonCode')
      .where('Tambons.amphoeCode = :amphCode', { amphCode: amphoeCode })
      .andWhere('Tambons.provinceCode = :provCode', { provCode: provinceCode })
      .getRawMany<TambonsResultModel>();

    return result;
  }

  async getZipCode(
    tambonCode: string,
    amphoeCode: string,
    provinceCode: string,
  ): Promise<ZipCodeResultModel[]> {
    const result = await this.tambonsRepository
      .createQueryBuilder('Tambons')
      .select('Tambons.zipcode', 'zipcode')
      .where('Tambons.tambonCode = :tamCode', { tamCode: tambonCode })
      .andWhere('Tambons.amphoeCode = :ampCode', { ampCode: amphoeCode })
      .andWhere('Tambons.provinceCode = :provCode', { provCode: provinceCode })
      .getRawMany<ZipCodeResultModel>();

    return result;
  }

  async getTambonDetail(
    tambonCode: string,
    amphoeCode: string,
    provinceCode: string,
    zipcode: string,
  ): Promise<Tambons> {
    const result = await this.tambonsRepository.findOne({
      where: { tambonCode, amphoeCode, provinceCode, zipcode },
    });

    return result;
  }
}
