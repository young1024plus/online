import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
   
  {
    path: '/',
    name: 'index',
    component: () => import('../views/index.vue')
  },
  {
    path: '/info/:id',
    name: 'info',
    component: () => import('../views/info.vue')
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('../views/my.vue')
  },
  {
    path: '/collect',
    name: 'collect',
    component: () => import('../views/collect.vue')
  },
  {
    path: '/sign',
    name: 'sign',
    component: () => import('../views/sign.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/search.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
