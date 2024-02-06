import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { notesProviders } from './notes.providers';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotesController],
  providers: [
    ...notesProviders,
    NotesService,
  ],
})
export class NotesModule {}