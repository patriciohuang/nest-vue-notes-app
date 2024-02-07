
<template>
<v-snackbar
  v-model="store.snackbarVisible"
  :timeout="store.snackbarTimeout"
  :color="store.snackbarType === 'error' ? 'red' : 'green'"
>
  {{ store.snackbarMessage }}
</v-snackbar>
</template>
<script setup lang="ts">
import { useNoteStore } from '@/stores/note';
const store = useNoteStore()
</script>