import { Injectable, Inject } from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { Category } from './entity/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: Repository<Category>
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findByIds(categoryIds: number[]): Promise<Category[]> {
    return await this.categoryRepository.find({
      where: { id: In(categoryIds) }
    });
  }
}
