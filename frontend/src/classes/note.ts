export default class Note {
  id: number;
  title: string;
  text: string;
  archived: boolean;

  constructor(id: number, title: string, text: string, archived: boolean) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.archived = archived;
  }
}
