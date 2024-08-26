import { createRouter, createWebHistory } from 'vue-router'
import middleware from './middleware'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/post/PostsView.vue'),
      props: { type: 'ALL' }
    },

    // Auth
    {
      path: '/login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/register',
      component: () => import('@/views/RegisterView.vue')
    },

    //Posts
    {
      path: '/posts',
      component: () => import('@/views/post/PostsView.vue'),
      props: { type: 'ALL' }
    },
    {
      path: '/posts/following',
      component: () => import('@/views/post/PostsView.vue'),
      props: { type: 'FOLLOWING' }
    },

    // Profile
    {
      path: '/profile/:idUser',
      component: () => import('@/views/profiles/ProfileView.vue'),
      props: { type: 'PROFILE' }
    },
    {
      path: '/profile/pet/:idUser',
      component: () => import('@/views/profiles/ProfileView.vue'),
      props: { type: 'PET' }
    },
      
    // Chats
    {
      path: '/chats',
      component: () => import('@/views/ChatView.vue')
    },
    {
      path: '/chats/:idChat',
      component: () => import('@/views/ChatView.vue')
    },

    // Search
    {
      path: '/search',
      component: () => import('@/views/SearchView.vue')
    }
  ]
})

new middleware(router)

export default router
