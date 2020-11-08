import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/matchmaking',
    name: 'Matchmaking',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Matchmaking.vue')
  },
  {
  path: '/message-bot',
  name: 'MessageBot',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../views/MessageBot.vue')
  },
  {
    path: '/voterfraud',
    name: 'VoterFrog',
    component: () => import('../views/VoterFraud.vue'),
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
