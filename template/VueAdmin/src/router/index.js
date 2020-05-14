import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import Dashboard from 'views/Dashboard.vue';

Vue.use(Router);

const router = new Router({
  mode: 'hash',
  routes: []
});

const commonRoutes = [
  { path: '/', redirect: '/label' },
  {
    path: '/401',
    component: Dashboard,
    children: [
      {
        path: '',
        component: () => import('views/Forbidden')
      }
    ]
  },
  { path: '*', redirect: '/401' }
];

router.beforeEach(async (to, from, next) => {
  const { user: userState } = store.state;

  if (userState.loaded) {
    next();
  } else {
    await store.dispatch('user/getLoginInfo');
    await store.dispatch('user/getMenuInfo');

    router.addRoutes([...userState.allowedRoutes, ...commonRoutes]);
    next({ ...to, replace: true });
    next();
  }
});

export default router;
