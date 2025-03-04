// src/database/database-seeder.service.ts

import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './entity/category.entity';

@Injectable()
export class CategoriesSeederService implements OnModuleInit {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: Repository<Category>,
  ) {}

  async onModuleInit() {
    await this.seedCategories();
  }

  // Method to seed sample categories
  private async seedCategories() {
    const count = await this.categoryRepository.count();

    if (count === 0) {
      const sampleCategories = [
        { name: 'Favorites' },
        { name: 'To-Do' },
        { name: 'Work' },
        { name: 'Personal' },
        { name: 'Study' },
        { name: 'Health' },
      ];

      await this.categoryRepository.save(sampleCategories);
      console.info('Sample categories have been created!');
    }
  }
}
