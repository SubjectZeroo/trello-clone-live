import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../views/AuthView.vue'

const routes = [
  {
    path: '/',
    name: 'auth',
    component: AuthView
  },
  {
    path: '/board',
    name: 'board',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "board" */ '../views/BoardView.vue'),
    children: [
      {
        path: "card/:id",
        name: "card",
        component: () => import(/* webpackChunkName: "card" */ '../views/CardView.vue'),
      }
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: () => import(/* webpackChunkName: "notofound" */ '../views/NotFoundView.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
