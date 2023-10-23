import { AbstractService } from '../common/abstract.service';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PreferencesShowProducts } from 'src/db/entities/PreferencesShowProducts';
import { Repository } from 'typeorm';

@Injectable()
export class PreferencesShowProductsService extends AbstractService {
  private logger = new Logger('PreferencesShowProductsService');

  constructor(
    @InjectRepository(PreferencesShowProducts)
    private readonly preferencesShowRepository: Repository<PreferencesShowProducts>,
  ) {
    super(preferencesShowRepository);
  }

  private async onModuleInit() {
    try {
      this.logger.warn(
        `starting check data in Preferences show products entity to create role`,
      );
      const initialDataExists = await this.checkInitialData();
      if (!initialDataExists) {
        await this.createInitialData();
      }
    } catch (error) {}
  }

  private async checkInitialData(): Promise<boolean> {
    try {
      const count = await this.preferencesShowRepository.count();
      return count > 0;
    } catch (error) {}
  }

  private async createInitialData(): Promise<void> {
    try {
      const firstPageSetting = {
        isLoggedIn: false,
        formatSettingsShow: 2,
        isMostSales: true,
        isLowestSales: false,
        productList: null,
        active: true,
        createBy: 'system',
        updateBy: '',
        createAt: new Date(),
        updateAt: new Date(),
      };
      const informationPageSetting = {
        isLoggedIn: true,
        formatSettingsShow: 2,
        isMostSales: true,
        isLowestSales: false,
        productList: null,
        active: true,
        createBy: 'system',
        updateBy: '',
        createAt: new Date(),
        updateAt: new Date(),
      };

      await super.create(firstPageSetting);
      await super.create(informationPageSetting);

      const referencesShow = await this.preferencesShowRepository.find();

      this.logger.warn(
        `Create ${
          referencesShow.length
        } Preferences show products in first starting project e-commerce-backend ${JSON.stringify(
          referencesShow,
        )}`,
      );
    } catch (error) {}
  }
  async findProductsByLogin(check): Promise<any> {
    try {
      const results = await this.preferencesShowRepository
        .createQueryBuilder('preferences_show')
        .addSelect('preferences_show.product_list')
        .addSelect(['preferences_show.format_settings_show'])
        .addSelect('preferences_show.is_most_sales')
        .where('preferences_show.is_loggedin = :is_loggedin', {
          is_loggedin: check === 'true' ? true : false,
        })
        .getRawMany();
      const formattedResults = results.map((result) => ({
        format_settings_show: result.preferences_show_format_settings_show,
        is_most_sales: result.preferences_show_is_most_sales,
        product_list: JSON.parse(
          JSON.stringify(result.preferences_show_product_list) || '[]',
        ),
      }));
      return formattedResults;
    } catch (error) {
      console.log('findProductsByLogin->Error');
    }
  }
}
