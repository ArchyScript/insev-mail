import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const InboxView = () => import('../views/Inbox.vue')
const ArchiveView = () => import('../views/Archive.vue')
const Login = () => import('../views/Login.vue')
const Logout = () => import('../views/Logout.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Inbox',
    component: InboxView,
  },
  {
    path: '/inbox',
    component: InboxView,
  },

  {
    path: '/archive',
    name: 'Archive',
    component: ArchiveView,
  },
  {
    path: '/auth/logout',
    name: 'Logout',
    component: Logout,
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: Login,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
