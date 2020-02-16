import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Game from '../views/Game.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  { path: '/login', name: 'login', component: Login },
  { path: '/signup', name: 'signup', component: SignUp },
  { path: '/signout', redirect: '/login' },
  {
    path: '/game',
    name: 'game',
    component: Game
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
