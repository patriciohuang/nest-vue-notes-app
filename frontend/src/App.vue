<template>
  <header>
    <nav>
      <v-tabs
        align-tabs="center"
      >
        <RouterLink to="/notes">
          <v-tab>Notes</v-tab>
        </RouterLink>
        <RouterLink to="/archived">
          <v-tab>Archived</v-tab>
        </RouterLink>
      </v-tabs>
    </nav>
  </header>
  <RouterView />
  <SnackbarComponent/>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import SnackbarComponent from './components/SnackbarComponent.vue';

</script>
<style>
.router-link-active button {
  border-bottom: 2px solid white;
}
</style>