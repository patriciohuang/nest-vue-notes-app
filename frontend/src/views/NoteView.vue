<template>
  <v-container>
    <v-form @submit.prevent="addNote">
        <v-row class="d-flex align-center">
          <v-col cols="12" md="10">
            <v-text-field v-model="noteText" label="Add a new note"></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-btn type="submit">Add Note</v-btn>
          </v-col>
        </v-row>
    </v-form>
    <ListComponent :notes="store.notes"/>
  </v-container>
</template>

<script setup lang="ts">
import ListComponent from '@/components/ListComponent.vue';
import { useNoteStore } from '@/stores/note';
import { onMounted, ref } from 'vue';

const store = useNoteStore();

onMounted(() => {
  store.fetchNotes();
})

const noteText = ref('');

const addNote = async () => {
  const text = noteText.value.trim();
  if (text) {
    await store.addNote({ text, archived: false });
    noteText.value = '';
  }
};
</script>
