import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as swaggerUi from 'swagger-ui-express';
import { writeFileSync } from 'fs';

/**
 * Swagger doc builder
 */
export class SwaggerDoc {
  setupDocs = (app: INestApplication, port: string) => {
    const config = new DocumentBuilder()
      .setTitle('InsightPro API')
      .setDescription('Microservices of Project-InsightPro')
      .setVersion('1.0')
      .addServer(`http://localhost:${port}`, 'Local environment')
      .addTag('auth', 'Authentication')
      .addTag('users', 'Users in system')
      .addTag('cart', '')
      .addTag('roles', 'Role of users')
      .addTag('category-product', '')
      .addTag('admin-market', '')
      .addTag('market', '')
      .addTag('notifications', '')
      .addTag('orders', '')
      .addTag('order-status', '')
      .addTag('parcel-delovery-detail', '')
      .addTag('parcel-status', '')
      .addTag('payments-type', '')
      .addTag('preferences-show-products', '')
      .addTag('products', '')
      .addTag('products-option', '')
      .addTag('tambons', '')
      .addTag('user-address', '')
      .build();

    const swaggerDocument = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, swaggerDocument);
    app.use(
      '/pe-shop-api/docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument),
    );

    // generate swagger json
    writeFileSync('./swagger-docs.json', JSON.stringify(swaggerDocument));
  };
}
