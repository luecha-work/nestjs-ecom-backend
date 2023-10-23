import { ParcelDeliveryDetails } from 'src/db/entities/ParcelDeliveryDetails';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractService } from '../common/abstract.service';

@Injectable()
export class ParcelDeliveryDetailService extends AbstractService {
  private logger = new Logger('ParcelDeliveryDetailService');
  constructor(
    @InjectRepository(ParcelDeliveryDetails)
    private readonly parcelDeliveryRepository: Repository<ParcelDeliveryDetails>,
  ) {
    super(parcelDeliveryRepository);
  }

  async getAllDetail() {
    return await this.parcelDeliveryRepository.find();
  }
}
