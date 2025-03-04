import { defineStore } from 'pinia';
import axios from 'axios';
import Note from '@/classes/note';
import Category from '@/classes/category';

type SnackBarType = 'success' | 'error'

export const useNoteStore = defineStore('note', {
  state: () => ({
    categories: [] as Category[],
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
    async fetchCategories() {
      try {
        const response = await axios.get('/api/categories');
        this.categories = response.data.map(
          (category: any) => new Category(category.id, category.name)
        ); // Store categories as Category objects
      } catch (error) {
        this.showSnackbar('Error loading categories', 'error');
      }
    },
    async fetchNotes(category?: Category) {
      try {
        const params: Record<string, string> = { archived: 'false' };

        if (category) {
          params.categoryId = `${category.id}`;
        }

        const response = await axios.get('/api/notes', { params });
        this.notes = response.data.map(
          (note: any) => new Note(note.id, note.title, note.categories.map((c: any) => new Category(c.id, c.name)), note.text, note.archived)
        );
      } catch (error) {
        this.showSnackbar('Error loading notes', 'error');
      }
    },
    async fetchArchivedNotes() {
      try {
        const response = await axios.get('/api/notes?archived=true');
        this.archiveNotes = response.data.map((note: any) => new Note(note.id, note.title, note.categories, note.text, note.archived));
      } catch (error) {
        this.showSnackbar('Error loading notes', 'error')
      }
    },
    async addNote(newNote: Omit<Note, 'id'>): Promise<Note | undefined> {
      try {
        const response = await axios.post('/api/notes', {...newNote});
        const createdNoteId = response.data
        const createdNote = new Note(createdNoteId, newNote.title, newNote.categories, newNote.text, newNote.archived);
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
        const categories = noteData.categories.map((c: any) => new Category(c.id, c.name))
        this.noteDetail = new Note(noteData.id, noteData.title, categories, noteData.text, noteData.archived);
      } catch (error: any) {
        if (error.response?.status !== 404) {
          console.error(error)
          this.showSnackbar('Error loading note', 'error')
        }
      } finally {
        this.noteDetailLoading = false
      }
    },
    async update(note: Note): Promise<boolean> {
      const categoryIds = note.categories.map(c => c.id)
      try {
        await axios.put(`/api/notes/${note.id}`, { title: note.title, categoryIds, text: note.text, archived: note.archived })
        return true
      } catch (error) {
        return false
      }
    },
    async toggleArchive(note: Note) {
      const isArchived = note.archived
      const categoryIds = note.categories.map(c => c.id)
      try {
        await axios.put(`/api/notes/${note.id}`, { title: note.title, categoryIds, text: note.text, archived: !isArchived })
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
