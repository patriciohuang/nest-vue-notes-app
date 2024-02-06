import { DataSource } from 'typeorm';
import { Note } from './entity/note.entity';

export const notesProviders = [
  {
    provide: 'NOTE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Note),
    inject: ['DATA_SOURCE'],
  },
];