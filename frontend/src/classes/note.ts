import type Category from "./category";

export default class Note {
  id: number;
  title: string;
  categories: Array<Category>;
  text: string;
  archived: boolean;

  constructor(id: number, title: string, categories: Array<Category>, text: string, archived: boolean) {
    this.id = id;
    this.title = title;
    this.categories = categories;
    this.text = text;
    this.archived = archived;
  }
}
