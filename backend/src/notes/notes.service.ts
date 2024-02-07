import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Note } from './entity/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @Inject('NOTE_REPOSITORY')
    private noteRepository: Repository<Note>,
  ) {}

  async findAll(archived: boolean | undefined): Promise<Note[]> {
    if (archived !== undefined) {
      return this.noteRepository.find({
        where: {
          archived: archived
        },
      })
    } else {
      return this.noteRepository.find();
    }
  }

  async findOne(id: number) {
    return this.noteRepository.findOneBy({
      id: id
    })
  }

  async create(title: string, text: string): Promise<number | undefined> {
    const result = await this.noteRepository.insert({
      title: title,
      text: text,
      archived: false
    });
    if (result) {
      return result.identifiers[0].id
    }
  }

  async update(id: number, title: string, text: string, archived: boolean) {
    this.noteRepository.update(id, {
      title: title,
      text: text,
      archived: archived
    })
  }

  async delete(id: number) {
    this.noteRepository.delete(id)
  }
}