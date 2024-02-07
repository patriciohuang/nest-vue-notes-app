<template>
  <v-container>
    <v-row align="center" justify="space-between">
      <v-col cols="2">
        <v-btn @click="addNote">Add Note</v-btn>
      </v-col>
      <v-col cols="8">
        <h1 class="text-center">Active notes</h1>
      </v-col>
      <v-col cols="2">
      </v-col>
    </v-row>
  </v-container>
  <ListComponent :notes="store.notes"/>
</template>

<script setup lang="ts">
import ListComponent from '@/components/ListComponent.vue';
import { useNoteStore } from '@/stores/note';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const store = useNoteStore();
const router = useRouter();

onMounted(() => {
  store.fetchNotes();
});

const addNote = async () => {
  const newNote = await store.addNote({ title: '', text: '', archived: false });
  if (newNote) {
    router.push(`/notes/${newNote.id}`);
  } else {
    store.showSnackbar('Error creating a new note', 'error')
  }
};
</script>
