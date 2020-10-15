import Vue from 'vue';
import VueRouter from 'vue-router';
import Discover from '@/views/Discover.vue';
import Home from '@/views/Discover/Home.vue';
import Account from '@/views/Account.vue';
import store from '@/store.js';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Discover,
    children: [
      {
        path: '',
        name: 'discover',
        component: Home
      },
      {
        path: 'search',
        component: () =>
          import(/* webpackChunkName: "about" */ '@/views/Discover/Search.vue'),
        children: [
          {
            path: '',
            name: 'discover-search',
            component: () =>
              import(/* webpackChunkName: "about" */ '@/views/Discover/SearchDefault.vue')
          },
          {
            path: 'result/:searchText',
            name: 'discover-search-result',
            props: true,
            component: () =>
              import(/* webpackChunkName: "about" */ '@/views/Discover/SearchResult.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/account',
    component: Account,

    children: [
      {
        path: 'login',
        name: 'login',
        component: () =>
          import(/* webpackChunkName: "about" */ '@/views/Account/Login.vue')
      },
      {
        path: '',
        name: 'account',
        component: () =>
          import(/* webpackChunkName: "about" */ '@/views/Account/Profile.vue'),
        beforeEnter: (to, from, next) => {
          console.log(store.state.login);
          console.log(store.state.cookie);
          if (store.state.login) {
            next();
          } else {
            next({name: 'login'});
          }
        },
      }
    ]
  },
  {
    path: '/play',
    name: 'play',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/Play.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
