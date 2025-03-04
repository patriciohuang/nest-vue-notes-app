<template>
  <v-container>
    <v-row align="center" justify="space-between">
      <v-col cols="2">
        <v-btn @click="addNote">Add Note</v-btn>
      </v-col>
      <v-col cols="8">
        <h1 class="text-center">Active Notes</h1>
      </v-col>
      <v-col cols="2">
        <!-- Category Filter -->
        <v-select
          v-model="selectedCategory"
          :items="categories"
          item-title="name"
          label="Filter by Category"
          clearable
          return-object
          @update:modelValue="fetchNotes"
        ></v-select>
      </v-col>
    </v-row>
  </v-container>

  <!-- List of Notes -->
  <ListComponent :notes="store.notes"/>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useNoteStore } from '@/stores/note';
import ListComponent from '@/components/ListComponent.vue';
import { useRouter } from 'vue-router';
import Category  from '@/classes/category'

const store = useNoteStore();
const router = useRouter();
const selectedCategory = ref<Category | undefined>(undefined);

// Fetch notes from the backend based on category filter
const fetchNotes = async () => {
  await store.fetchNotes(selectedCategory.value);
};

onMounted(fetchNotes);

const categories = computed(() => store.categories);

const addNote = async () => {
  const newNote = await store.addNote({ title: '', text: '', categories: [], archived: false });
  if (newNote) {
    router.push(`/notes/${newNote.id}`);
  } else {
    store.showSnackbar('Error creating a new note', 'error');
  }
};

</script>
