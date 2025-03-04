import { GetCategoryDTO } from "src/categories/dto/getCategory.dto";

export class GetNoteDto {
  id: number;
  title: string;
  categories: GetCategoryDTO[];
  text: string;
  archived: boolean;

  constructor(id: number, title: string, categories: GetCategoryDTO[], text: string, archived: boolean) {
    this.id = id;
    this.title = title;
    this.categories = categories;
    this.text = text;
    this.archived = archived;
  }
}