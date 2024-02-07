<template>
  <v-btn
    color="#BDBDBD"
    @click.stop="store.toggleArchive(note)"
  >
    {{ store.noteDetail ? (note.archived ? 'Unrchive' : 'Archive') : '' }}
    <v-icon v-if="!note.archived"
      size="24"
      class="archive-icon"
      icon="mdi-archive-arrow-down-outline">
    </v-icon>
    <v-icon v-else size="24"
      class="archive-icon"
      icon="mdi-archive-arrow-up-outline">
    </v-icon>
  </v-btn>
</template>
<script setup lang="ts">
import Note from '@/classes/note';
import { useNoteStore } from '@/stores/note';

const store = useNoteStore();
const props = defineProps<{
  note: Note;
}>();
</script>