import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store.js';
import SvgIcon from '@/components/SvgIcon.vue';

Vue.config.productionTip = false;


Vue.component('svg-icon', SvgIcon);
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
