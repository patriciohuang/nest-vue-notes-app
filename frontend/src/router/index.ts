import { createRouter, createWebHistory } from 'vue-router'
import ArchivedViewVue from '@/views/ArchivedView.vue'
import NoteViewVue from '@/views/NoteView.vue'
import DetailViewVue from '@/views/DetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/notes',
      name: 'notes',
      component: NoteViewVue
    },
    {
      path: '/notes/:id',
      name: 'detail',
      component: DetailViewVue
    },
    {
      path: '/archived',
      name: 'archived',
      component: ArchivedViewVue
    }
  ]
})

export default router
