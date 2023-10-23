import { ProductsService } from './modules/products/products.service';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { NotificationsService } from './modules/notifications/notifications.service';

@Injectable()
export class Scheduler {
  constructor(
    private readonly notificService: NotificationsService,
    private readonly productsService: ProductsService,
  ) {
    this.handleCron();
  }

  // @Cron('0 * * * * *') // รูปแบบ cron job ที่ทำงานทุก 1 นาที
  // @Cron('0 * * * *') // รูปแบบ cron job ที่ทำงานทุก 1 ชั่วโมง
  @Cron('0 0 * * *') // รูปแบบ cron job ที่ทำงานทุก 1วัน
  async handleCron() {
    const products = await this.productsService.getAllDetail();
    for (let product of products) {
      let margetId = product?.market?.id;
      let create_by = 'system';
      let currenDate = new Date();
      let notifyExpirationDate = new Date(product?.notifyExpirationDate);
      let product_amount = product?.productAmount;
      let out_stock_notific = product?.outStockNotification;

      currenDate.setHours(0, 0, 0, 0);
      notifyExpirationDate.setHours(0, 0, 0, 0);

      if (currenDate > notifyExpirationDate) {
        let message = `ชื่อสินค้า(${product?.productName}) รหัสสินค้า(${
          product?.productCode
        }) วันที่สินค้าหมดอายุ: ${notifyExpirationDate.toLocaleDateString()}`;

        let title = 'สินค้าไกล้หมดอายุ';

        await this.notificService.createNotification(
          create_by,
          title,
          message,
          '',
          margetId,
        );
      }

      if (out_stock_notific > product_amount) {
        let message = `ชื่อสินค้า(${product?.productName}) รหัสสินค้า(${product?.productCode}) สินค้าคงเหลือ:${product_amount} ชิ้น`;
        let title = 'สินค้าในคลังไกล้หมด';

        await this.notificService.createNotification(
          create_by,
          title,
          message,
          '',
          margetId,
        );
      }
    }
  }
}
