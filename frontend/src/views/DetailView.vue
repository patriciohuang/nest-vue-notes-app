<template>
  <v-container>
    <div v-if="noteDetail">
      <v-form @submit.prevent="saveNote">
        <v-textarea v-model="noteDetail.text"></v-textarea>
        <v-btn type="submit">Save</v-btn>
        <v-btn @click="cancel">Cancel</v-btn>
      </v-form>
    </div>
    <div v-else-if="noteDetailLoading">
      <p>Loading...</p>
    </div>
    <div v-else>
      <p>Note not found</p>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { useNoteStore } from '@/stores/note';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter()
const store = useNoteStore();
onMounted(() => {
  store.fetchOne(parseInt(route.params.id as string));
});

const { noteDetail, noteDetailLoading } = storeToRefs(store);

const saveNote = async () => {
  if (noteDetail.value) {
    await store.update(noteDetail.value.id, noteDetail.value.text, noteDetail.value.archived);
    router.push('/notes');
  }
};

const cancel = () => {
  router.go(-1); // Go back to the previous page
};
</script>

<style scoped>
.note-title {
  font-size: 24px;
  margin-bottom: 16px;
}
</style>
