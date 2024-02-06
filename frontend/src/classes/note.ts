export default class Note {
  id: number;
  text: string;
  archived: boolean;

  constructor(id: number, text: string, archived: boolean) {
    this.id = id;
    this.text = text;
    this.archived = archived;
  }
}
