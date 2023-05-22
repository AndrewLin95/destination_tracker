import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    component: () => import('./Login/LoginView.vue'),
  },
  {
    path: "/home",
    component: () => import('./components/MainPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  linkActiveClass: 'active'
})

export default router;

const app = createApp(App);
app.use(router);
app.mount('#app');

