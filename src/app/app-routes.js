import Vue from 'vue';
import Router from 'vue-router';
import { PageNotFound } from './shared/components';
import clientRoutes from "@/app/client/client-routes";

const baseRoutes = [
  {
    path: '/',
    redirect: '/audio',
  },
  {
    path: '/404',
    name: 'Страница не найдена',
    component: PageNotFound,
  },
];

Vue.use(Router);
const router = new Router({
  mode: 'history',
  routes: [
    ...baseRoutes,
    ...clientRoutes,
    {
      path: '*',
      redirect: '/404',
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.name;
  next();
});

export default router;
