import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store.js';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => {
    console.log(App);
    return h(App);
  }
}).$mount('#app');
