<template>
  <v-container>
    <div v-if="noteDetail">
      <div class="d-flex justify-space-between align-center my-3">
        <ToggleArchiveComponent :note="noteDetail"/>
        <DeleteModalComponent :note="noteDetail"/>
      </div>
      <v-text-field
        v-model="noteDetail.title"
        label="Title"
        required
        hide-details
        class="mb-4"
      ></v-text-field>
      <v-form @submit.prevent="saveNote">
        <v-textarea auto-grow v-model="noteDetail.text"></v-textarea>
        <div class="d-flex justify-center mt-4">
          <v-btn class="mx-5" color="primary" type="submit">Save</v-btn>
          <v-btn color="grey darken-2" @click="cancel">Cancel</v-btn>
        </div>
      </v-form>
    </div>
    <div v-else-if="noteDetailLoading">
      <v-progress-linear indeterminate color="primary"></v-progress-linear>
    </div>
    <div v-else>
      <p class="note-not-found">404 | Note not found</p>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { useNoteStore } from '@/stores/note';
import { storeToRefs } from 'pinia';
import { onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import DeleteModalComponent from '@/components/DeleteModalComponent.vue';
import ToggleArchiveComponent from '@/components/ToggleArchiveComponent.vue';

const route = useRoute();
const router = useRouter()
const store = useNoteStore();

onMounted(() => {
  store.fetchOne(parseInt(route.params.id as string));
});

onUnmounted(() => {
  store.noteDetail = undefined;
});

const { noteDetail, noteDetailLoading } = storeToRefs(store);

const saveNote = async () => {
  if (noteDetail.value) {
    const success: boolean = await store.update(noteDetail.value);
    if (success) {
      router.push('/notes');
      store.showSnackbar('Note saved', 'success')
    } else {
      store.showSnackbar('Error saving the note', 'error')
    }
  }
};

const cancel = () => {
  router.go(-1);
};
</script>

<style scoped>
.note-not-found {
  font-size: 18px;
  color: #757575;
  text-align: center;
  margin-top: 20px;
}
</style>
