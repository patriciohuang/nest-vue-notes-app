<template>
  <v-dialog width="500">
    <template v-slot:activator="{ props }">
      <v-btn
        v-if="!store.noteDetail"
        v-bind="props"
        color="#E53935"
      >
        <v-icon size="24" icon="mdi-trash-can-outline"></v-icon>
      </v-btn>
      <v-btn
        v-else
        v-bind="props"
        color="#E53935"
      >
        Delete
        <v-icon size="24" icon="mdi-trash-can-outline"></v-icon>
      </v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card title="Dialog">
        <v-card-text>
          Are you sure you want to delete the following note? <b class="truncate">{{note?.text}}</b><br>This action cannot be undone.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="acceptDelete"
            text="Delete"
            color="#E53935"
          >
          </v-btn>
          <v-btn
            text="Cancel"
            @click="isActive.value = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import Note from '@/classes/note';
import router from '@/router';
import { useNoteStore } from '@/stores/note';

const store = useNoteStore();
const props = defineProps<{
  note: Note;
}>();

const acceptDelete = () => {
  if (props.note) {
    store.delete(props.note);
    if (store.noteDetail) {
      if(props.note.archived) {
        router.push('/archived');
      } else {
        router.push('/notes');
      }
    }
  }
};
</script>

<style>
.truncate {
  display: block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}</style>