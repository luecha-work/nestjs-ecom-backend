import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PaginatedResult } from './paginated-result.interface';
import { BaseResultError } from './base-result-error.interface';

@Injectable()
export abstract class AbstractService {
  protected constructor(protected readonly repository: Repository<any>) {}

  async all(relations = []): Promise<any[]> {
    return this.repository.find({ relations });
  }

  async paginate(page: number = 1, relations = []): Promise<PaginatedResult> {
    const take = 8;

    const [data, total] = await this.repository.findAndCount({
      take,
      skip: (page - 1) * take,
      relations,
    });

    return {
      data: data,
      meta: {
        total,
        page,
        last_page: Math.ceil(total / take),
      },
    };
  }

  async create(data: any): Promise<any> {
    return this.repository.save(data);
  }

  async findOne(condition, relations = []): Promise<any> {
    try {
      return await this.repository.findOne(condition, { relations });
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: any, data): Promise<any> {
    try {
      return await this.repository.update(id, data);
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: any): Promise<any> {
    try {
      return await this.repository.delete(id);
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
