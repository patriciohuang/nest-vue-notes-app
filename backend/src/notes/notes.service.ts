import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Note } from './entity/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @Inject('NOTE_REPOSITORY')
    private noteRepository: Repository<Note>,
  ) {}

  async findAll(): Promise<Note[]> {
    return this.noteRepository.find();
  }

  async findOne(id: number) {
    return this.noteRepository.findBy({
      id: id
    })
  }

  async create(text: string) {
    this.noteRepository.insert({
      text: text,
      archived: false
    });
  }

  async update(id: number, text: string, archived: boolean) {
    this.noteRepository.update(id, {
      text: text,
      archived: archived
    })
  }

  async delete(id: number) {
    this.noteRepository.delete(id)
  }
}