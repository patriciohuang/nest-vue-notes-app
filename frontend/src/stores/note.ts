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
        const response = await axios.get('http://localhost:3000/notes?archived=false');
        this.notes = response.data.map((note: any) => new Note(note.id, note.text, note.archived));
      } catch (error) {
        console.log(error);
      }
    },
    async fetchArchivedNotes() {
      try {
        const response = await axios.get('http://localhost:3000/notes?archived=true');
        this.archiveNotes = response.data.map((note: any) => new Note(note.id, note.text, note.archived));
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
    async update(note: Note) {
      try {
        await axios.put(`http://localhost:3000/notes/${note.id}`, { text: note.text, archived: note.archived })
      } catch (error) {
        console.log(error)
      }
    },
    async toggleArchive(note: Note) {
      const isArchived = note.archived
      try {
        await axios.put(`http://localhost:3000/notes/${note.id}`, { text: note.text, archived: !isArchived })
        if (isArchived) {
          this.fetchArchivedNotes()
        } else {
          this.fetchNotes()
        }
      } catch (error) {
        console.log(error)
      }
    },
    async delete(note: Note) {
      const isArchived = note.archived
      try {
        await axios.delete(`http://localhost:3000/notes/${note.id}`)
        if (isArchived) {
          this.fetchArchivedNotes()
        } else {
          this.fetchNotes()
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
});
