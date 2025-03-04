<template>
  <v-container>
    <v-list v-if="notes.length > 0">
      <v-list-item
        v-for="note in notes"
        :key="note.id"
        @click="event => {$router.push({path: `/notes/${note.id}`})}"
      >
        <template v-slot:prepend>
          <v-icon color="primary">mdi-circle-medium</v-icon>
        </template>

        <!-- Title with Chips -->
        <template v-slot:title>
          <div class="d-flex align-center">
            <span class="note-title">{{ note.title || 'Untitled' }}</span>
            <v-chip
              v-for="category in note.categories"
              :key="category.id"
              class="ml-2"
              color="primary"
              size="x-small"
              label
            >
              {{ category.name }}
            </v-chip>
          </div>
        </template>

        <!-- Subtitle (Note Text) -->
        <template v-slot:subtitle>
          {{ note.text }}
        </template>

        <!-- Category Chips -->
        <template v-slot:append>
          <ToggleArchiveComponent :note="note" class="mx-3"/>
          <DeleteModalComponent :note="note" class="mx-3"/>
        </template>
      </v-list-item>
    </v-list>
    <p v-else class="text-center text-body-1">No notes</p>
  </v-container>
</template>

<script setup lang="ts">
import Note from '@/classes/note';
import { useNoteStore } from '@/stores/note';
import DeleteModalComponent from './DeleteModalComponent.vue';
import ToggleArchiveComponent from './ToggleArchiveComponent.vue';

const store = useNoteStore();
defineProps<{
  notes: Note[];
}>();
</script>

<style scoped>

.note-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.note-text {
  font-size: 16px;
  line-height: inherit;
}
</style>
