<template>
  <v-container>
    <v-row>
      <v-col cols="2">
      </v-col>
      <v-col cols="8">
        <h1 class="text-center">Archived</h1>
      </v-col>
      <v-col cols="2">
      </v-col>
    </v-row>
  </v-container>
  <ListComponent :notes="store.archiveNotes"/>
</template>

<script setup lang="ts">
import ListComponent from '@/components/ListComponent.vue';
import { useNoteStore } from '@/stores/note';
import { onMounted } from 'vue';

const store = useNoteStore();
onMounted(() => {
  store.fetchArchivedNotes();
})
</script>
