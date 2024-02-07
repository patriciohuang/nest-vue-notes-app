import { createRouter, createWebHistory } from 'vue-router'
import ArchivedView from '@/views/ArchivedView.vue'
import NotesView from '@/views/NotesView.vue'
import DetailView from '@/views/DetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/notes',
      name: 'notes',
      component: NotesView
    },
    {
      path: '/notes/:id',
      name: 'detail',
      component: DetailView
    },
    {
      path: '/archived',
      name: 'archived',
      component: ArchivedView
    },
    {
      path: '/',
      redirect: '/notes'
    }
  ]
})

export default router
