import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentType } from 'src/db/entities/PaymentType';
import { AbstractService } from '../common/abstract.service';

@Injectable()
export class PaymentTypeService extends AbstractService {
  private logger = new Logger('PaymentTypeService');
  constructor(
    @InjectRepository(PaymentType)
    private readonly paymentTypeRepository: Repository<PaymentType>,
  ) {
    super(paymentTypeRepository);
  }

  async getAllDetail() {
    return await this.paymentTypeRepository.find();
  }

  async findPaymentType() {
    return await this.paymentTypeRepository
      .createQueryBuilder('payment_type')
      .orderBy('payment_type.paymentCode', 'ASC')
      .getMany();
  }
}
