import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { NotesService } from './notes.service';
import { GetNoteDto } from './dto/getNote.dto';
import { CreateNoteDto } from './dto/createNote.dto';
import { UpdateNoteDto } from './dto/updateNote.dto';
import { GetCategoryDTO } from 'src/categories/dto/getCategory.dto';

@Controller('api/notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get('')
  async getAll(@Query('archived') archived: string | undefined, @Query('categoryId') categoryId: number | undefined): Promise<GetNoteDto[]> {
    const archivedParam = archived ? archived === 'true' : undefined;
    const notes = await this.notesService.findAll(archivedParam, categoryId);
    return notes.map(note => {
      const categories = note.categories?.map(c => new GetCategoryDTO(c.id, c.name)) || [];
      return new GetNoteDto(note.id, note.title, categories, note.text, note.archived);
    });
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<GetNoteDto> {
    const note = await this.notesService.findOne(id);
    const categories = note.categories?.map(c => new GetCategoryDTO(c.id, c.name)) || [];
    return new GetNoteDto(note.id, note.title, categories, note.text, note.archived);
  }

  @Post('')
  async create(@Body() createNoteDto: CreateNoteDto): Promise<number | undefined> {
    return await this.notesService.create(createNoteDto.title, createNoteDto.text);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateNoteDto: UpdateNoteDto) {
    return await this.notesService.update(id, updateNoteDto.title, updateNoteDto.categoryIds, updateNoteDto.text, updateNoteDto.archived);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.notesService.delete(id);
  }
}
