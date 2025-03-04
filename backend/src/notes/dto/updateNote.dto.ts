export class UpdateNoteDto {
  title: string;
  categoryIds: number[];
  text: string;
  archived: boolean;
}