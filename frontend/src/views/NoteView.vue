<template>
  <v-container>
    <v-row class="d-flex align-right">
      <v-col cols="12" md="2">
        <v-btn @click="addNote">Add Note</v-btn>
      </v-col>
    </v-row>
    <ListComponent :notes="store.notes"/>
  </v-container>
</template>

<script setup lang="ts">
import ListComponent from '@/components/ListComponent.vue';
import { useNoteStore } from '@/stores/note';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const store = useNoteStore();
const router = useRouter();

onMounted(() => {
  store.fetchNotes();
});

const addNote = async () => {
  const newNote = await store.addNote({ text: '', archived: false });
  if (newNote) {
    router.push(`/notes/${newNote.id}`);
  }
};
</script>
