import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { NotesService } from './notes.service';
import { GetNoteDto } from './dto/getNote.dto';
import { CreateNoteDto } from './dto/createNote.dto';
import { UpdateNoteDto } from './dto/updateNote.dto';

@Controller()
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get('notes')
  async getAll(@Query('archived') archived: string | undefined): Promise<GetNoteDto[]> {
    const archivedParam = archived ? archived === 'true' : undefined
    return (await this.notesService.findAll(archivedParam)).map(note => {
      const dto = new GetNoteDto()
      dto.id = note.id
      dto.text = note.text
      dto.archived = note.archived
      return dto
    });
  }

  @Get('notes/:id')
  async getOne(@Param('id') id: number) {
    return this.notesService.findOne(id)
  }

  @Post('notes')
  async create(@Body() createNoteDto: CreateNoteDto): Promise<number | undefined> {
    const createdId = await this.notesService.create(createNoteDto.text)
    return createdId
  }

  @Put('notes/:id')
  async update(@Param('id') id: number, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(id, updateNoteDto.text, updateNoteDto.archived)
  }

  @Delete('notes/:id')
  async delete(@Param('id') id: number) {
    return this.notesService.delete(id)
  }
}
