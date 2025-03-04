import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { categoriesProviders } from './categories.providers';
import { DatabaseModule } from '../database/database.module';
import { CategoriesSeederService } from './categories-seeder.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoriesController],
  providers: [CategoriesService, ...categoriesProviders, CategoriesSeederService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
