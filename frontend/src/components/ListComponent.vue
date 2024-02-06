<template>
  <v-container>
    <v-card elevation="2">
      <v-list>
        <v-list-item
          v-for="note in notes"
          :key="note.id"
          class="note-item"
          @click="event => {$router.push({path: `/notes/${note.id}`})} "
        >
          <v-list-item-title class="note-text">{{ note.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import Note from '@/classes/note';
import { useNoteStore } from '@/stores/note';

const store = useNoteStore();
const props = defineProps<{
  notes: Note[];
}>();
</script>

<style scoped>
.note-item {
  padding: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  transition: background-color 0.3s;
}

.note-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.note-text {
  font-size: 16px;
}
</style>
