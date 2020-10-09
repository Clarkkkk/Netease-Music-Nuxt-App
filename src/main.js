import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store.js';
import AppIcon from '@/components/AppIcon.vue';

Vue.config.productionTip = false;

Vue.component('app-icon', AppIcon);
const req = require.context('./assets/icons', false, /\.svg$/);
req.keys().map(req);

new Vue({
  router,
  store,
  render: (h) => {
    console.log(App);
    return h(App);
  }
}).$mount('#app');
