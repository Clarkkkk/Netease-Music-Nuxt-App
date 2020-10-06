import Vue from 'vue';
import VueRouter from 'vue-router';
import Discover from '@/views/Discover.vue';
import DiscoverHome from '@/views/Discover/DiscoverHome.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'discover',
    component: Discover,
    children: [
      {
        path: '',
        component: DiscoverHome
      },
      {
        path: 'search',
        name: 'discover-search',
        component: () =>
          import(/* webpackChunkName: "about" */ '@/views/Discover/DiscoverSearch.vue'),
        children: [
          {
            path: '',
            name: 'discover-search-default',
            component: () =>
              import(/* webpackChunkName: "about" */ '@/views/Discover/DiscoverSearch/Default.vue')
          },
          {
            path: 'result/:searchText',
            name: 'discover-search-result',
            props: true,
            component: () =>
              import(/* webpackChunkName: "about" */ '@/views/Discover/DiscoverSearch/Result.vue')
          }
        ]
      },

    ]
  },
  {
    path: '/playing',
    name: 'playing',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/Playing.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
