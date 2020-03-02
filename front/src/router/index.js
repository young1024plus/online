import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  
  {
    path: '/sign',
    name: 'sign',
    component: () => import('../views/sign.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
