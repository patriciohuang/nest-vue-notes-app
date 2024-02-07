<template>
  <v-container>
    <div v-if="noteDetail">
      <ModalComponent :note="noteDetail"/>
      <v-form @submit.prevent="saveNote">
        <v-textarea auto-grow v-model="noteDetail.text"></v-textarea>
        <v-btn class="mx-5" color="hsla(160, 100%, 37%, 1)" type="submit">Save</v-btn>
        <v-btn color="#2c3e50" @click="cancel">Cancel</v-btn>
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
import ModalComponent from '@/components/ModalComponent.vue';

const route = useRoute();
const router = useRouter()
const store = useNoteStore();
onMounted(() => {
  store.fetchOne(parseInt(route.params.id as string));
});

const { noteDetail, noteDetailLoading } = storeToRefs(store);

const saveNote = async () => {
  if (noteDetail.value) {
    await store.update(noteDetail.value);
    router.push('/notes');
  }
};

const cancel = () => {
  router.go(-1);
};
</script>

<style scoped>
.note-title {
  font-size: 24px;
  margin-bottom: 16px;
}
</style>
