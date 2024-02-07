import { defineStore } from 'pinia';
import axios from 'axios';
import Note from '@/classes/note';

type SnackBarType = 'success' | 'error'

export const useNoteStore = defineStore('note', {
  state: () => ({
    notes: [] as Note[],
    archiveNotes: [] as Note[],
    noteDetail: undefined as Note | undefined,
    noteDetailLoading: false,
    snackbarVisible: false,
    snackbarType: 'success' as SnackBarType,
    snackbarTimeout: 1500,
    snackbarMessage: ''
  }),
  actions: {
    async fetchNotes() {
      try {
        const response = await axios.get('/api/notes?archived=false');
        this.notes = response.data.map((note: any) => new Note(note.id, note.title, note.text, note.archived));
      } catch (error) {
        this.showSnackbar('Error loading notes', 'error')
      }
    },
    async fetchArchivedNotes() {
      try {
        const response = await axios.get('/api/notes?archived=true');
        this.archiveNotes = response.data.map((note: any) => new Note(note.id, note.title, note.text, note.archived));
      } catch (error) {
        this.showSnackbar('Error loading notes', 'error')
      }
    },
    async addNote(newNote: Omit<Note, 'id'>): Promise<Note | undefined> {
      try {
        const response = await axios.post('/api/notes', newNote);
        const createdNoteId = response.data
        const createdNote = new Note(createdNoteId, newNote.title, newNote.text, newNote.archived);
        this.notes.push(createdNote);
        return createdNote;
      } catch (error) {
        return undefined
      }
    },
    async fetchOne(id: number) {
      this.noteDetailLoading = true
      try {
        const response = await axios.get(`/api/notes/${id}`);
        const noteData = response.data;
        this.noteDetail = new Note(noteData.id, noteData.title, noteData.text, noteData.archived);
      } catch (error: any) {
        if (error.response?.status !== 404) {
          this.showSnackbar('Error loading note', 'error')
        }
      } finally {
        this.noteDetailLoading = false
      }
    },
    async update(note: Note): Promise<boolean> {
      try {
        await axios.put(`/api/notes/${note.id}`, { title: note.title, text: note.text, archived: note.archived })
        return true
      } catch (error) {
        return false
      }
    },
    async toggleArchive(note: Note) {
      const isArchived = note.archived
      try {
        await axios.put(`/api/notes/${note.id}`, { title: note.title, text: note.text, archived: !isArchived })
        if (this.noteDetail) {
          this.noteDetail.archived = !isArchived
        } else {
          if (isArchived) {
            this.fetchArchivedNotes()
          } else {
            this.fetchNotes()
          }
        }
        this.showSnackbar(`Note ${isArchived ? 'unarchived' : 'archived'}`, 'success')
      } catch (error) {
        this.showSnackbar(`Error ${isArchived ? 'unarchiving' : 'archiving'} the note`, 'error')
      }
    },
    async delete(note: Note) {
      const isArchived = note.archived
      try {
        await axios.delete(`/api/notes/${note.id}`)
        this.showSnackbar('Note deleted', 'success')
        if (isArchived) {
          this.fetchArchivedNotes()
        } else {
          this.fetchNotes()
        }
      } catch (error) {
        this.showSnackbar('Error deleting the note', 'error')
      }
    },
    showSnackbar(message: string, type: SnackBarType, timeout = 1500) {
      this.snackbarMessage = message;
      this.snackbarType = type;
      this.snackbarTimeout = timeout;
      this.snackbarVisible = true;
    }
  },
});
