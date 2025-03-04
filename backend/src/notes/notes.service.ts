import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Note } from './entity/note.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/categories/entity/category.entity';

@Injectable()
export class NotesService {
  constructor(
    @Inject('NOTE_REPOSITORY')
    private noteRepository: Repository<Note>,
    private categoryService: CategoriesService
  ) {}

  async findAll(archived?: boolean, categoryId?: number): Promise<Note[]> {
    // leftJoinAndSelect ensures ALL categories for each note are loaded,
    // regardless of subsequent filtering
    const query = this.noteRepository.createQueryBuilder('note')
    .leftJoinAndSelect('note.categories', 'categories');

    if (archived !== undefined) {
      query.andWhere('note.archived = :archived', { archived });
    }

    if (categoryId !== undefined) {
      // Ensures only notes with the specified category are returned
      // While still maintaining ALL categories for those notes
      query.innerJoin('note.categories', 'filteredCategory', 'filteredCategory.id = :categoryId', { categoryId });
    }

    return query.getMany();
  }


  async findOne(id: number): Promise<Note> {
    const result = await this.noteRepository.findOne({
      where: { id },
      relations: ['categories'] // simplified form of left join to include relations
    })
    if (!result) {
      throw new NotFoundException('Note not found')
    }
    return result
  }

  async create(title: string, text: string): Promise<number | undefined> {

    const note = this.noteRepository.create({
        title,
        text,
        archived: false
    });

    const result = await this.noteRepository.insert(note);
    return result.identifiers[0].id;
  }

  async update(id: number, title: string, categoryIds: number[], text: string, archived: boolean) {
    const note = await this.findOne(id)

    const categories: Category[] = await this.categoryService.findByIds(categoryIds);

    note.title = title
    note.text = text
    note.archived = archived
    note.categories = categories

    return await this.noteRepository.save(note);
  }

  async delete(id: number) {
    const result = await this.noteRepository.delete(id)
    if (!result.affected) {
      throw new NotFoundException('Note not found')
    }
  }
}