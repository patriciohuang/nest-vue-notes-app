import { Injectable, Inject, NotFoundException } from '@nestjs/common';
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

  async findOne(id: number): Promise<Note> {
    const result = await this.noteRepository.findOneBy({ id: id })
    if (!result) {
      throw new NotFoundException('Note not found')
    }
    return result
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
    const result = await this.noteRepository.update(id, {
      title: title,
      text: text,
      archived: archived
    })
    if (!result.affected) {
      throw new NotFoundException('Note not found')
    }
  }

  async delete(id: number) {
    const result = await this.noteRepository.delete(id)
    if (!result.affected) {
      throw new NotFoundException('Note not found')
    }
  }
}