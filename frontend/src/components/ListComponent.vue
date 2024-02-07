<template>
  <v-container>
    <v-card elevation="2" v-if="notes.length > 0">
      <v-list>
        <v-list-item
          v-for="note in notes"
          :key="note.id"
          class="note-item"
        >
          <div class="w-100 d-flex justify-space-between">
            <v-list-item-title class="note-text w-100 pt-2" @click="event => {$router.push({path: `/notes/${note.id}`})}">{{ note.text }}</v-list-item-title>
            <v-btn
              color="#BDBDBD"
              class="mx-2"
              @click="store.toggleArchive(note)"
            >
              <v-icon v-if="note.archived"
                size="24"
                class="archive-icon"
                icon="mdi-archive-arrow-down-outline">
              </v-icon>
              <v-icon v-else size="24"
                class="archive-icon"
                icon="mdi-archive-arrow-up-outline">
              </v-icon>
            </v-btn>
            <ModalComponent :note="note"/>
          </div>
        </v-list-item>
      </v-list>
    </v-card>
    <p v-else>No notes</p>
  </v-container>
</template>

<script setup lang="ts">
import Note from '@/classes/note';
import { useNoteStore } from '@/stores/note';
import ModalComponent from './ModalComponent.vue';

const store = useNoteStore();
defineProps<{
  notes: Note[];
}>();
</script>

<style scoped>
.note-item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  transition: background-color 0.3s;
}

.note-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.note-text {
  font-size: 16px;
  line-height: inherit;
}
.archive-icon {
  color: #757575;
}
.truncate {
  display: block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
