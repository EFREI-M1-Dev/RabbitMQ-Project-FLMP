import AuthView from '@/view/AuthView.vue';
import DesktopView from '@/view/DesktopView.vue';
import { createMemoryHistory, createRouter } from 'vue-router';

const routes = [
  { path: '/auth', component: AuthView },
  { path: '/', component: DesktopView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
