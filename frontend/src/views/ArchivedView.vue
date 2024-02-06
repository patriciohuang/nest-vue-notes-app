<template>
  <div class="archived-notes">
    <h1 class="title">Archived</h1>
    <v-container>
      <ListComponent :notes="store.archiveNotes"/>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import ListComponent from '@/components/ListComponent.vue';
import { useNoteStore } from '@/stores/note';

const store = useNoteStore();
</script>

<style scoped>
.archived-notes {
  padding: 20px;
}

.title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #676565;
  margin-bottom: 20px;
}
</style>
