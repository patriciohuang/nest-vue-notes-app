import { defineStore } from 'pinia';
import axios from 'axios';
import Note from '@/classes/note';

export const useNoteStore = defineStore('note', {
  state: () => ({
    notes: [] as Note[],
    archiveNotes: [] as Note[],
    noteDetail: undefined as Note | undefined,
    noteDetailLoading: false
  }),
  actions: {
    async fetchNotes() {
      try {
        const response = await axios.get('http://localhost:3000/notes');
        const noteData = response.data.map((note: any) => new Note(note.id, note.text, note.archived));
        this.notes = noteData.filter((note: Note) => !note.archived);
        this.archiveNotes = noteData.filter((note: Note) => note.archived);
      } catch (error) {
        console.log(error);
      }
    },
    async addNote(newNote: Omit<Note, 'id'>) {
      try {
        const response = await axios.post('http://localhost:3000/notes', newNote);
        const createdNote = new Note(response.data.id, newNote.text, newNote.archived);
        this.notes.push(createdNote);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchOne(id: number) {
      this.noteDetailLoading = true
      try {
        const response = await axios.get(`http://localhost:3000/notes/${id}`);
        const noteData = response.data;
        this.noteDetail = new Note(noteData.id, noteData.text, noteData.archived);
      } catch (error) {
        console.log(error);
      } finally {
        this.noteDetailLoading = false
      }
    },
    async update(id: number, text: string, archived: boolean) {
      console.log(text, archived)
      try {
        await axios.put(`http://localhost:3000/notes/${id}`, { text, archived })
        const updatedNote = this.notes.find(note => note.id === id)
        if (updatedNote) {
          updatedNote.text = text
          updatedNote.archived = archived
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
});
