import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    component: () => import('../Login/LoginView.vue'),
  },
  {
    path: "/home",
    component: () => import('../components/MainPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes,
  linkActiveClass: 'active'
})

export default router;