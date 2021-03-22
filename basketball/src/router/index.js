import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import( '../views/index')
  },
  {
    path:'/rule',
    name:'rule',
    component: () => import('../views/rule')
  },
  {
    path:'/',
    name:'logoin',
    component: () => import('../views/logoin')
  },
  {
    path:'/nba',
    name:'nba',
    component: () => import('../views/nba')
  },
  {
    path:'/cba',
    name:'cba',
    component: () => import('../views/cba')
  },
  {
    path:'/comment',
    name:'comment',
    component: () => import('../views/comment')
  },
  {
    path:'/newDetail',
    name:'newDetail',
    component: () => import('../views/newDetail')
  },
]

const router = new VueRouter({
  routes,
})

export default router
